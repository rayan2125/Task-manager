import express from "express"
import routers from "./api/index.js"

const router = express.Router()
const routeapi = routers;
const api = "/api";
router.use(api,routeapi)
router.use(api, (req, res) =>
    res.status(404).send( {
        status: "Failed",
        message: "No API route found"
      })
);
export default  router