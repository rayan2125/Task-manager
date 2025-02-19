import User from "../model/userModel.js";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import { comparePasswords, hashPassword } from "../config/passwordCrpt.js";


dotenv.config();



class UserServices {
  // Register New User
  static async createUser(userData) {
    try {
      if (!userData || Object.keys(userData).length === 0) {
        throw new Error("Request body cannot be empty");
      }

      // Hash password before saving
      userData.password = await hashPassword(userData.password);

      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // User Login
  static async userLogin(userData) {
    try {
      const { email, password } = userData;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Compare hashed passwords
      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
// console.log("this token is coming::",token)
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  // Get All Users
  static async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw error;
    }
  }

  // Get User By ID
  static async getUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  // Update User
  static async updateUser(userId, updateData) {
    try {
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }

      return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete User
  static async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default UserServices;
