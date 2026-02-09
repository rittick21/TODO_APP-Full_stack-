import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import "dotenv/config"
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors'

export const app = express();

// Using JSON Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// app.use(express.urlencoded({ extended: true }));

// Using the user routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

// Using Error Middleware
app.use(errorMiddleware);
