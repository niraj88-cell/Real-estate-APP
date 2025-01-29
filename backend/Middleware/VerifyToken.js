import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Ensure you're accessing the correct header key
  if (authHeader) {
    // Ensure that the token follows the "Bearer <token>" format
    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    
    if (!token) {
      return res.status(403).json("Token not found!");
    }

    // Verify the token using the correct secret
    jwt.verify(token, "nirajisagoodboy", (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json("Token is not valid!");
      }
      
      req.user = user; // Attach the user info to the request
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export default VerifyToken;
