import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  specialFunc,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Route to get all users
router.get("/all", getAllUsers);

// Route to create a new user
router.post("/new", registerUser);

// Route for special case
router.get("/userid/specialcase", specialFunc);

// Search user by ID
// Try to put the dynamic route at the end to avoid conflicts
// // Route to get user via ID
// router.get("/userid/:id", getUserById);

// // Route to update a user by ID
// router.put("/userid/:id", updateUser);

// // Route to delete a user by ID
// router.delete("/userid/:id", deleteUser);

router.route("/userid/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
