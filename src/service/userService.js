import User from "../model/userModel.js";

class UserServices {
  static async createUser(userData) {
    try {
      if (!userData || Object.keys(userData).length === 0) {
        throw new Error("Request body cannot be empty");
      }

      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async userlogin (userData){
    let {email}=userData 
    try {
        let user = await User.findOne({email:email})
    } catch (error) {
       throw error 
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
      return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default UserServices;
