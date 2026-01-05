import express from 'express';
import router from './routes/user.js';
import "dotenv/config"

export const app = express();

// Using JSON Middleware for parsing JSON bodies
app.use(express.json());

// Using the user routes
app.use("/users", router);

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});
