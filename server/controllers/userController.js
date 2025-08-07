import { generateToken } from "../lib/utils.js";
import User from "../module/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// sign up a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required details" 
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                success: false, 
                message: "Account already exists" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);
        res.status(201).json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully"
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// controller to login a user 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const token = generateToken(userData._id);
        userData.currentToken = token;
        await userData.save();

        res.status(200).json({
            success: true,
            userData,
            token,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.status(200).json({ 
        success: true, 
        user: req.user 
    });
};

// controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        if (!bio && !fullName && !profilePic) {
            return res.status(400).json({ 
                success: false, 
                message: "At least one field (bio, fullName, or profilePic) is required" 
            });
        }

        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    profilePic: upload.secure_url,
                    bio,
                    fullName
                },
                { new: true }
            );
        }

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            user: updatedUser,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.error("Update profile error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};


