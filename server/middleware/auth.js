import User from "../module/User.js"
import jwt from "jsonwebtoken"

export const protectRoute=async(req,res,next)=>{
    try{
        const token =req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication token is required" 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded || !decoded.userId) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Invalid authentication token" 
                });
            }

            const user=await User.findById(decoded.userId).select("-password");

            if(!user) return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });

            req.user=user;
            next();
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: "Authentication token has expired" 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: "Invalid authentication token" 
            });
        }

    } catch (error){
      console.error("Auth middleware error:", error.message);
      res.status(500).json({ 
          success: false, 
          message: "Authentication failed" 
      });
    }

}

// controller to check if user is authenticated 
export const checkAuth=(req,res)=>{
    res.json({success:true, user: req.user});
}