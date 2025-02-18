import express from "express";
import userRouter from "./userApi";
import taskRouter from "./taskApi";


const routers = express.Router();

// Array of routes and their respective routers
const routes = [
  { path: "/user", router: userRouter },
  { path: "/task", router: taskRouter },
  
];

// Loop through the routes and apply them to the router
routes.forEach(({ path, router }) => {
  routers.use(path, router);
});

export default routers;
