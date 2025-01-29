import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";
import prisma from "../lib/Prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });

  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days
    const token = jwt.sign(
      { id: user.id },
      "nirajisagoodboy",
      { expiresIn: age }
    );
    const {password:userPassword,...userInfo}=user;

    // Set cookie and return success response
    res.status(200).json({ ...userInfo, token });

  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  // Implement logout logic
};