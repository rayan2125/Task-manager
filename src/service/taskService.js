import Task from "../model/taskModel.js";

class TaskServices {
  static async createTask(taskData) {
    try {
      const task = new Task(taskData);
      await task.save();
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTasks() {
    try {
      return await Task.find().populate("user");
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(taskId) {
    try {
      return await Task.findById(taskId).populate("user");
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
