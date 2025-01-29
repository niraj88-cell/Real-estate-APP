import prisma from '../lib/Prisma.js';

export const getPosts = async (req, res) => {
    const query = req.query;

    console.log("Received query parameters:", query);

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
                Price: {
                    gte: query.minPrice ? parseInt(query.minPrice) : 0,
                    lte: query.maxPrice ? parseInt(query.maxPrice) : 1000000,
                },
            },
        });

        console.log("Fetched posts:", posts);

        setTimeout(() => {
            res.status(200).json(posts);
        }, 3000);

    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Failed to fetch posts!" });
    }
};


export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                }
            }
        });

        let isSaved = false;
        const token = req.cookies?.token;

        if (token) {
            JsonWebTokenError.verify(token, "nirajsiagoodboy", async (err, payload) => {
                if (!err) {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                postId: id,
                                userId: payload.id,
                            },
                        },
                    });

                    isSaved = saved ? true : false;
                }
            });
        }

        res.status(200).json({ ...post, isSaved });

    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ message: "Failed to fetch post!" });
    }
};
export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.user.id;

    // Log the incoming request body for debugging
    console.log("Request Body:", JSON.stringify(body, null, 2)); // Pretty-print the JSON
    console.log("User ID:", tokenUserId);

    try {
        const addPost = await prisma.post.create({
            data: {
                title: body.title,
                Price: body.price, // Ensure correct casing
                images: body.images || [],
                address: body.address,
                city: body.city,
                bedroom: body.bedroom,
                bathroom: body.bathroom,
                latitude: body.latitude,
                longitude: body.longitude,
                type: body.type,
                property: body.property,
                userId: tokenUserId,
                postDetail: body.postDetail ? {
                    create: {
                        desc: body.postDetail.desc || '',
                        utilities: body.postDetail.utilities || null,
                        pet: body.postDetail.pet || null,
                        income: body.postDetail.income || null,
                        size: body.postDetail.size || null,
                        school: body.postDetail.school || null,
                        bus: body.postDetail.bus || null,
                        resturant: body.postDetail.resturant || null,
                    },
                } : undefined, // Only create postDetail if it exists
            },
        });

        console.log("Post Added:", addPost);
        res.status(200).json(addPost);
    } catch (err) {
        console.error("Error Adding Post:", err);
        res.status(500).json({ message: "Failed to add post!" });
    }
};



export const updatePost = async (req, res) => {
    try {
        // Placeholder for update logic
        res.status(200).json({ message: "Post updated!" });
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Failed to update post!" });
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized to delete this post!" });
        }

        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: "Post deleted!" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "Failed to delete post!" });
    }
};