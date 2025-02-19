import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { comparePasswords, hashPassword } from "../config/passwordCrpt.js";


dotenv.config();



class UserServices {
    // Register New User
    static async createUser(userData) {
        let { email } = userData;
        try {
            let checkEmail = await User.findOne({ email });
            if (checkEmail) {
                throw { status: 409, message: "Email already exists. Please try another one." };
            }

            userData.password = await hashPassword(userData.password);

            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error.status ? error : { status: 500, message: "Internal Server Error" };
        }
    }


    // User Login
    static async userLogin(userData) {
        try {
            const { email, password } = userData;

       
            const user = await User.findOne({ email });

            if (!user) {
                throw { status: 401, message: "Invalid email or password" };
            }

           
            const isMatch = await comparePasswords(password, user.password);
            if (!isMatch) {
                throw { status: 401, message: "Invalid email or password" };
            }

          
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            // console.log("this token is coming::",token)
            return { user, token };
        } catch (error) {
            throw error.status ? error : { status: 500, message: "Internal Server Error" };
        }
    }

  
    static async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    }


    static async getUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw error;
        }
    }

  
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
