import express from "express";
import userRouter from "./userApi.js";
import taskRouter from "./taskApi.js";
import authMiddleware from "../../middleware/auth.js";

const routers = express.Router();

// Array of routes and their respective routers
const routes = [
    { path: "/user", router: userRouter },
    { path: "/task", middleware: authMiddleware, router: taskRouter },
];


routes.forEach(({ path, router, middleware }) => {
    if (middleware) {
        routers.use(path, middleware, router);
    } else {
        routers.use(path, router);
    }
});

export default routers;
