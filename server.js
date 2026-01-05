import { app } from "./app.js";
import { connectDB } from './config/db.js';

// const router = express.Router();
connectDB();

const port = process.env.PORT;
if(!port) {
    console.log("Port not found in environment variables");
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
