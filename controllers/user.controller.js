import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendTokens } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json({
//       success: true,
//       users,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 404));

    sendTokens(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 404));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendTokens(user, res, `Registered ${user.name} Successfully`, 201);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
        message: "Logout successfully"
      });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMyProfile, logoutUser };
