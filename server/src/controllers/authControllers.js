import  bcrypt from "bcryptjs"
import User from "../models/Users.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const signup=async(req,res)=>{
    try{
        const{name,email,password,age,role,collegeName,year,branch}=req.body;

        
        if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Name,email and password are required"
        })
      }

       // check for existing user
       const existiingUser=await User.findOne({email});
       if(existiingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
       }
       // hashing password
       const hashedPassword=await bcrypt.hash(password,10);

       const user=await User.create({
        name,email,password:hashedPassword,
        age,role,collegeName,
        year,branch
       })

       const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN || "7D"}
       )

       // sending details to frontend
       res.status(201).json({
        success:true,
        message:"Signup succesful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            age:user.age,
            collegeName:user.collegeName,
            year:user.year,
            branch:user.branch,
        }
       });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Signup Failed",
            error:error.message,
        })
    }
}

export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
            })
        }

        // check for user existance
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        // compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"password is incorrect"
            })
        }

        const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN || "7D"}
       )

        // success response
        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
           message:"Login failed",
           error:error.message,
        })
    }
}
export const logout=async(req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"logout succesfully"
        })
    } catch (error) {
      res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
    }
}

export const forgotPassword=async(req,res)=>{
    try {
        const{email}=req.body;
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            })
        }
        const user=User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesnt exist"
            })
        }
        const resetToken=crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

         await user.save();

      res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken,
    });
    } catch (error) {
      res.status(500).json({
      success: false,
      message: "Forgot password failed",
      error: error.message,
    });
    }
}

export const resetPassword=async(req,res)=>{
    try {
        const {token,newPassword}=req.body;
        if(!token || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Token and new Password are required"
            })
        }
        const user=await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpire:{ $gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired token"
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword,
        user.resetPasswordToken=undefined,
        user.resetPasswordExpire=undefined,

        await user.save();
        res.status(200).json({
            success:true,
            message:"Password reset succesfully"
        })
    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Reset password failed",
      error: error.message,
    });
    }
}