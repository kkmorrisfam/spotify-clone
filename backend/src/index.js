import express from "express";
import dotenv from "dotenv";
import path from "path";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import cors from 'cors';

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";


dotenv.config();
// find the global .env file at the root for both the backend and the frontend
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT

//middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());  // to parse req.body
app.use(clerkMiddleware());  // add auth to req object (req.auth.userId)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,  
    limits:{
        fileSize: 10*1024*1024 // 10MB max file size
    }
}));


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);


// error handler
app.use((error, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
})

app.listen(PORT, ()=> {
    console.log("Server is running on port " + PORT)
    connectDB();
})

// todo: socket.io for realtime communications