import express from "express";
import {
  registerUser,
  loginUser,
  getMyProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to create a new user
router.post("/new", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for get the user details
router.get("/me", isAuthenticated, getMyProfile);

// Route for user logout
router.get("/logout", logoutUser);

export default router;
