import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '187d' // token expires in 187 days
        });
        return token;
    } catch (error) {
        console.error("Token generation error:", error.message);
        throw new Error("Failed to generate token");
    }
};