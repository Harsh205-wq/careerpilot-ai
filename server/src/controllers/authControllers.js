import  bcrypt from "bcryptjs"
import User from "../models/Users.js"

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

       // sending details to frontend
       res.status(201).json({
        success:true,
        message:"Signup succesful",
        user:{
            id:user_id,
            name:user.name,
            email:user.email,
            role:user.role,
            age:user.role,
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

        // success response
        res.status(200).json({
            success:true,
            message:"Login successful",

            user:{
            id:user._id,
            name:user._name,
            email:user._email,
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
