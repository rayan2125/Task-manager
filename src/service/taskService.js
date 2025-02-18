import Task from "../model/taskModel";

class TaskServices {
    static async createTask(req, res) {
      try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  
    static async getAllTasks(req, res) {
      try {
        const tasks = await Task.find().populate("user");
        res.send(tasks);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  
    static async getTaskById(req, res) {
      try {
        const task = await Task.findById(req.params.id).populate("user");
        if (!task) {
          return res.status(404).send();
        }
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  
    static async updateTask(req, res) {
      try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
          return res.status(404).send();
        }
        res.send(task);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  
    static async deleteTask(req, res) {
      try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
          return res.status(404).send();
        }
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }

  export default TaskServices