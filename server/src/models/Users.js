import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // automatically string ke starting aur ending spaces remove karta hai.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "professional", "admin"],  // fixed allowed values only
      default: "student",
    },
    age: {
      type: Number,
    },
    collegeName: {
      type: String,
      trim: true,
    },
    year:{
      type:Number,
      num:[1,2,3,4],
      trim:true,
    },
    branch:{
      type:String,
      trim:true
    },
    resetPasswordToken:{
      type:String
    },
    resetPasswordExpire:{
      type:Date
    }
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);
export default User;
