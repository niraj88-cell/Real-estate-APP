import prisma from "../lib/Prisma.js";

export const getUsers= async(req,res)=>{
  try{
  const users=await prisma.user.findMany();
  res.status(200).json(users)
  }catch(err){
    res.status(500).json({message:"Failed to fetch Users!"})
  }
}

export const getUser= async(req,res)=>{
    const id=req.params.id;
    try{
        const user=await prisma.user.findUnique({
            where:{id},
        })
        res.status(200).json(user)
  
    }catch(err){
      res.status(500).json({message:"Failed to fetch user!"})
    }
  }

  export const updateUser= async(req,res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    const {password,avatar,...otherInputs}=req.body;
    

    if(id!==tokenUserId){ return res.status(403).json({message:'"Not authorized'})};
    let updatedPassword=null;
    try{

    
        if(password){
            updatedPassword=await bcrypt.hash(password,10);
        }
        const updatedUser=await prisma.user.update({
            where:{id},
            data:{
                 ...otherInputs,
                 ...(updatedPassword &&{password:updatedPassword}),
                 ...apiRequest(avatar && {avatar})
            }, 
        })

        res.status(200).json({message:"User Updated!"})
       
        
  
    }catch(err){
      res.status(500).json({message:"Failed to update user!"})
    }
  }

  export const deleteUser= async(req,res)=>{

    const id=req.params.id;
    const tokenUserId=req.userId;

    if(id!==tokenUserId){ return res.status(403).json({message:'"Not authorized'})};
    try{
        await prisma.user.delete({
            where:{id},
        })
        res.status(200).json({message:"User deleted!"})
  
    }catch(err){
      res.status(500).json({message:"Failed to delete user!"})
    }
  }



  
  export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
  
    try {
      // Check if the post is already saved
      const savedPost = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
  
      if (savedPost) {
        // If found, remove it from saved posts
        await prisma.savedPost.delete({
          where: {
            id: savedPost.id,
          },
        });
        return res.status(200).json({ message: "Post removed from saved list" });
      } else {
        // If not found, add it to saved posts
        await prisma.savedPost.create({
          data: {
            userId: userId,
            postId: postId,
          },
        });
        return res.status(200).json({ message: "Post saved" });
      }
    } catch (err) {
      console.error(err); // Log the actual error for debugging
      res.status(500).json({ message: "An error occurred while saving the post" });
    }
  };
  



  
export const profilePosts= async(req,res)=>{
  const tokenUserId=req.params.userId;
  try{
      const userPosts=await prisma.post.findMany({
        where:{userId:tokenUserId},
      });

      const saved=await prisma.savedPost.findMany({
        where:{userId:tokenUserId},
        include:{
          post:true,
        }
      });

      const savedPosts=saved.map(item=>item.post)
      res.status(200).json(userPosts,savedPosts)

  }catch(err){
    res.status(500).json({message:"Failed to Profile post!"})
  }
}





export const getNotificationNum= async(req,res)=>{
  const tokenUserId=req.userId;
  try{
      const number=await prisma.chat.count({
        where:{
          userIds:{
            hasSome:[tokenUserId],
          },
          NOT:{
            seenBy:{
              hasSome:[tokenUserId]
            },
          },
        },
      });
      res.status(200).json(number);

  }catch(err){
    res.status(500).json({message:"Failed to Profile post!"})
  }
}