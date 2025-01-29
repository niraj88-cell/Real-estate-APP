import prisma from "../lib/Prisma.js";

export const getChats= async(req,res)=>{
    const tokenUserid=req.userId;
  try{
    const chats=await prisma.chat.findMany({
         where:{
            userIDs:{
                 hasSome:[tokenUserid],
            }
         }
    });


    for (const chat of chats){
        const receiverId=chat.userIds.find((id)=> id!==tokenUserid);
        const receiver =await prisma.user.findUnique({
            where:{
                id:receiverId,
            },
            select:{
                id:true,
                username:true,
                avatar:true,
            }
        });
        chat.receiver=receiver;
    } 

  }catch(err){
    res.status(500).json({message:"Failed to get Chats!"})
  }
}

export const getChat= async(req,res)=>{

    const tokenUserId=req.userId;
  
    try{
        const chat=await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIds:{
                    hasSome:[tokenUserId],
                },
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc",
                    }
                }
            }
        });

        await prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
  
    }catch(err){
      res.status(500).json({message:"Failed to get Chats!"})
    }
  }

  

  export const addChat= async(req,res)=>{
    const tokenUserId=req.userId
    try{
        const newChat=await prisma.chat.create({
            data:{
                  userIDs:[tokenUserId,req.body.receiverId]
            }
        })
  
    }catch(err){
      res.status(500).json({message:"Failed to get Chats!"})
    }
  }

  


  export const readChat= async(req,res)=>{
    const tokenUserId=req.userId;
    try{
        const chat= await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
  
    }catch(err){
      res.status(500).json({message:"Failed to get Chats!"})
    }
  }
  

