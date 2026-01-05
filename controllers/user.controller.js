import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  // console.log(req.query.keyword);
  res.json({
    success: true,
    users,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(201).cookie("temp", "lol").json({
    success: true,
    message: "Signed Up Successfully",
  });
};

const specialFunc = async (req, res) => {
  res.json({
    success: true,
    message: "Just for fun",
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // console.log(req.params);
  res.json({
    success: true,
    user,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});
  res.json({
    success: true,
    message: "Updated Successfully",
    updatedUser
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "User deleted successfully",
    deletedUser
  });
};

export { registerUser, getAllUsers, getUserById, specialFunc, updateUser, deleteUser };
