
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js';

export const register = async (req,res) =>{
    const {name , email, password} = req.body;

    if (!email || !name || !password) {
       return res.json({success :false , message : 'Missing Missing Details'})
    }
    try {
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.json({success:false , message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = new userModel({name , email , password:hashedPassword})
        await user.save()

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET ,{expiresIn : '7d'})
        
        res.cookie('token' , token, {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24* 60*60*1000
        })
        // sending wellCome email 

        const mailOptions = {
            from : process.env.SMTP_USER,
            to: email,
            subject : "welcome to our app",
            text : `welcome to our app your accoutn hasben create with email id ${email}`
        } 
        
       try {
            await transporter.sendMail(mailOptions);
            console.log("successful sending email")

} catch (err) {
  console.error( err.message);
}

        return res.json({success : true})
    } catch (error) {
        res.json({success : false , message :error.message})
    }
}

export const login =async (req,res) =>{
     const { email, password} = req.body;
     if (!email || !password) {
        return res.json({success : false , message : "email and password are required"})
     }
     try {
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success : false , message : 'invalid email or password'})   
        }
       const isMatch = await bcrypt.compare(password , user.password)
       if (!isMatch) {
          return res.json({success : false , message : 'invalid email or password'})  
       }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET ,{expiresIn : '7d'})

        res.cookie('token' , token, {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24* 60*60*1000
        })
        return res.json({success : true})
     } catch (error) {
        res.json({success : false , message :error.message})
     }

}

export const logout = async (req, res) =>{
    try {
        res.clearCookie('token' , {
             httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            
        })
        return res.json({success : true , message : "Logged out"})
    } catch (error) {
        res.json({success : false , message :error.message})

    }
}


// send verification otp to the user email 

export const sendVerifyOtp = async (req,res) =>{
 
    try {
        const {userId} = req.body || {}
           if (!userId) {
        return res.status(400).json({ success: false, message: "userId is required" });
        }
        const user =await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({success : false , message : "Account Already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() *900000))

        user.verifyOtp = otp

        user.verifyOtpExpireAt = Date.now() + 24 *60*60*1000

        await user.save()

        const mailOption ={   
            from : process.env.SENDER_EMAIL,
            to: user.email,
            subject : "Account verification Otp",
            text : `Your Otp is ${otp} verify you account using this Otp`
        }
        await transporter.sendMail(mailOption)
      return  res.json({success : true , message :"verify Email send your Email "})
    } catch (error) {
       return res.json({success : false , message : error.message})
        console.log('this error')
    }
}

export const verifyEmail = async (req,res) =>{
    const {userId , otp} = req.body;
    if (!userId || !otp) {
        return res.json({success : false , message :" Missing Details"})        
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({success : false , message : " User not found"})            
        }
        if(user.verifyOtp === '' || user.verifyOtp !==otp){
           return res.json({success : false , message : "Invalid Otp"})
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({success : false , message : "Otp expired"})         
        }
        user.isAccountVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpireAt = ''
        await user.save()
        return res.json({success : true , message :"email verify success"})
    } catch (error) {
        res.json({success : false , message : error.message})
       
    }
}