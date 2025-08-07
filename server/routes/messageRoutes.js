import express from "express";
import auth from "../middleware/auth.js";
import { getMessages, getUserForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", auth, getUserForSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.put("/mark/:id", auth, markMessageAsSeen);
messageRouter.post("/send/:id", auth, sendMessage);

export default messageRouter;

