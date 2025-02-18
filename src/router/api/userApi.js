import express, { Router } from "express"
import { DeletMember, MembersDetailsController, UpdateMember, ViewMember } from "../../controllers/mmberDtls.controllers.js"
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler } from "../../controller/userController.js"


const userRouter = express(Router)
userRouter.post("/create",createUserHandler)
userRouter.post("/allView",getAllUsersHandler )
userRouter.get("/:id", getUserByIdHandler)
userRouter.put("/:id", updateUserHandler)
userRouter.delete("/:id", deleteUserHandler)

export default userRouter