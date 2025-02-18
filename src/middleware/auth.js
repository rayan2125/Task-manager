import jwt from "jsonwebtoken";
import User from "../model/user.model.js"; // Import User model
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from headers
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: No token provided" });
    }

    // Extract token
    const token = authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use an environment variable for security

    // Find user by ID from the token payload
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password from query result

    if (!user) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: User not found" });
    }

    // Attach user data to request object
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ status: "failed", message: "Invalid Token", error: error.message });
  }
};

export default authMiddleware;
