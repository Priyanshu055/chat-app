import cloudinary from "../lib/cloudinary.js";
import Message from "../module/message.js";
import User from "../module/User.js";

export const getUserForSidebar = async(req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // count number of messages not seen
        const unseenMessages = {};
        const promises = filteredUsers.map(async(user) => {
            const messages = await Message.find({
                senderId: user._id, 
                receiverId: userId, 
                seen: false
            });
        
            if(messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        });
        
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages});

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message.find({ chatId });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Failed to get messages" });
    }
};

// api to mark message as seen using message id
export const markMessageAsSeen = async(req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.json({success: true});
    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};

// send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;

        const message = new Message({
            chatId,
            senderId,
            text,
        });

        await message.save();

        res.status(201).json(message);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};