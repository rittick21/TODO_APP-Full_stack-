import { app } from "./app.js";
import { connectDB } from './config/db.js';

// const router = express.Router();
connectDB();

const port = process.env.PORT;
const mode = process.env.NODE_ENV;
if(!port || !mode) {
    console.log("Port or mode value is  not found in environment variables");
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port} in ${mode}`);
});
