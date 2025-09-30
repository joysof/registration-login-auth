import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const getUserData = async (req,res) =>{

    try {
         const token = req.cookies.token;
        if(!token) return res.json({ success: false, message: 'Not authorized. Login again.' });

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user =await userModel.findById(userId)
        if (!user) {
            return res.json({success : false , message : "user not found"})
        }
        
        return res.json({
            success :true,
            userData : {
                name : user.name ,
                isAccountVerified : user.isAccountVerified
            }
        })
    } catch (error) {
        res.json({success : false , message : error.message})
    }
}