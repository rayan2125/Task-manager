import express, { Router } from "express"
import { createTaskHandler, deleteTaskHandler, getAllTasksHandler, getTaskByIdHandler, updateTaskHandler } from "../../controller/taskController"



const taskRouter = express(Router)
taskRouter.post("/create",createTaskHandler)

taskRouter.get("/view", getAllTasksHandler)
taskRouter.get("/:id", getTaskByIdHandler)
taskRouter.get("/:id", updateTaskHandler)
taskRouter.delete("/:id",deleteTaskHandler )

export default taskRouter