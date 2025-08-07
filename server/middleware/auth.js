import jwt from "jsonwebtoken";
import User from "../module/User.js";

const auth = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user || user.currentToken !== token) {
            return res.status(401).json({ success: false, message: "Logged in elsewhere" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default auth;