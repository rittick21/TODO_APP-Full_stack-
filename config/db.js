import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;

if(!MONGO_URI) {
    console.log("MONGO_URI not found in environment variables");
}

if(!DATABASE) {
    console.log("DATABASE not found in environment variables");
}

export const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      dbName: DATABASE,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};
