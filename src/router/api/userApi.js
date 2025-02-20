import express, { Router } from "express"

import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler, userLoginHandler } from "../../controller/userController.js"


const userRouter = express(Router)
userRouter.post("/signup",createUserHandler)
userRouter.post("/login",userLoginHandler);

export default userRouter