import express from "express";
import dotenv from "dotenv";
import path from "path";

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


const app = express();
const PORT = process.env.PORT

//middleware
app.use(express.json());  // to parse req.body

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, ()=> {
    console.log("Server is running on port " + PORT)
    connectDB();
})