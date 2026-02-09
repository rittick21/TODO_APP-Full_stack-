import jwt from "jsonwebtoken";

export const sendTokens = (user, res, message, statusCode = 200) => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    return res.status(500).json({
      success: false,
      message: "JWT secret is not defined or not under .env",
    });
  }
  const token = jwt.sign({ _id: user._id }, jwt_secret);
  console.log(process.env.NODE_ENV);
  console.log(process.env.NODE_ENV === "Development" ? false : true);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message,
    });
};
