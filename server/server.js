import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Add your client URL
    credentials: true
}));
app.use(express.json({ limit: "4mb" }));

// initialize socket.io server
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173", // Add your client URL
        credentials: true
    }
});

// store online user
 const userSocketMap = {};
app.use((req, res, next) => {
    req.io = io;
    req.userSocketMap = userSocketMap;
    next();
});


// socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


// Routes
app.use("/api/status", (req, res) => res.json({
    success: true,
    message: "Server is live"
}));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// Database connection and server start
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000; // This is correct!
        server.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();