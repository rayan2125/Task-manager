import TaskServices from "../service/taskService.js";

export const createTaskHandler = async (req, res) => {
  try {
    const task = await TaskServices.createTask(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await TaskServices.getAllTasks();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTaskByIdHandler = async (req, res) => {
  try {
    const task = await TaskServices.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTaskHandler = async (req, res) => {
  try {
    const task = await TaskServices.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTaskHandler = async (req, res) => {
  try {
    const task = await TaskServices.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
