import Task from "../model/taskModel.js";

class TaskServices {
  static async createTask(taskData,info) {
    const { title, description,  } = taskData;
    const{_id:user}=info
    try {
        const task = new Task({ title, description, user });
      await task.save();
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTasks(user) {
    const{_id:id}=user
   
    try {

       return await Task.find({ user: id }).populate("user");
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(taskId) {
    // console.log(taskId)
    let _id = taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw { status: 400, message: "Invalid task id" };
      }
    try {
      return await Task.findById(_id).populate("user");
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(taskId, updateData) {
    try {
      return await Task.findByIdAndUpdate(taskId, updateData, { new: true, runValidators: true });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(taskId) {
    try {
      return await Task.findByIdAndDelete(taskId);
    } catch (error) {
      throw error;
    }
  }
}

export default TaskServices;
