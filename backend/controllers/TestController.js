import jwt from "jsonwebtoken";



export const shouldBeLoggedIn = async (req, res) => {
       console.log(req.userId)
        res.status(200).json({ message: "You are authenticated" });

}

export const shouldBeAdmin = async (req, res) => {
    // Implement your admin check logic here
    // This might involve checking user roles or permissions in the database
}