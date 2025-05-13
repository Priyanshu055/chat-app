import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

app.use(cors());

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// Routes
app.use("/api/status", (req, res) => res.json({
    success: true,
    message: "Server is live"
}));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

let dbConnected = false; // Flag to track DB connection

const startServer = async () => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
            console.log("Database connected");
        } catch (error) {
            console.error("Failed to connect to database:", error.message);
            throw error; // Re-throw the error
        }
    }
};

export default async function handler(req, res) {
    try {
        await startServer(); // Ensure DB connection

        // Handle the request using Express app
        app(req, res);
    } catch (error) {
        console.error("Unhandled exception in handler:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Optional: Start the server locally if not running on Vercel
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}

