import express from "express";
import { newTask, getUserTasks, updateTask, deleteTask } from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getUserTasks);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;
