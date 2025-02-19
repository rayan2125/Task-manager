import express, { Router } from "express"

import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler, userLoginHandler } from "../../controller/userController.js"


const userRouter = express(Router)
userRouter.post("/create",createUserHandler)
userRouter.get("/allView",getAllUsersHandler )
userRouter.get("/:id", getUserByIdHandler)
userRouter.put("/:id", updateUserHandler)
userRouter.delete("/:id", deleteUserHandler)
userRouter.post("/login",userLoginHandler);

export default userRouter