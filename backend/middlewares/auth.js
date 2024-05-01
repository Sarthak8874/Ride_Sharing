const jwt = require("jsonwebtoken")
require("dotenv").config();

const authMiddleware = async(req,res,next) => {
    try{
        const authHeaders = req.headers.authorization;
        if(!authHeaders || !authHeaders.startsWith('Bearer ')){
            return res.status(403).json({
                success : false,
                message:"Token not found in headers"
            });
        }

        const token = authHeaders.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.userId
        next();
    }
    catch{
        return res.status(403).json({
            success:false,
            message:"Error in auth middleware"
        });
    }
}


module.exports = authMiddleware;

