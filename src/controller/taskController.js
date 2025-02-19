import TaskServices from "../service/taskService.js";

export const createTaskHandler = async (req, res) => {
   

  try {
    
    const task = await TaskServices.createTask(req.body,req.user);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await TaskServices.getAllTasks(req.user);
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getTaskByIdHandler = async (req, res) => {
  try {
    const task = await TaskServices.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateTaskHandler = async (req, res) => {
  try {
    const task = await TaskServices.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const deleteTaskHandler = async (req, res) => {
  try {
    const task = await TaskServices.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
