import express from 'express'
import notesRoutes from './Routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use(express.json()); // Parses JSON bodies which we can access via req.body

app.use(rateLimiter);


app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// CONNECTING AND STARTING SERVER CAN BE DONE ON SEPERATE LINES AS WELL

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at PORT : ${PORT}`);
    })
})
