// Users\PRIYANSHU\OneDrive\Desktop\chat-app\server\server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Routes
app.use("/api/status", (req, res) => res.json({
    success: true,
    message: "Server is live"
}));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
let dbConnected = false;

const startServer = async () => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
            console.log("Database connected");
        } catch (error) {
            console.error("Failed to connect to database:", error.message);
            throw error;
        }
    }
};

// This is what Vercel will use
export default async function handler(req, res) {
    try {
        await startServer();
        return app(req, res);
    } catch (error) {
        console.error("Handler error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Only for local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}