import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";

const normalizeEmail = (email) => email?.trim().toLowerCase();
const normalizeText = (value) => (typeof value === "string" ? value.trim() : value);
const normalizeSkills = (skills) => {
  if (skills === undefined) {
    return undefined;
  }

  if (Array.isArray(skills)) {
    return skills.map((skill) => normalizeText(skill)).filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => normalizeText(skill))
      .filter(Boolean);
  }

  return undefined;
};

const createAuthToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
};

const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  targetRole: user.targetRole,
  focusArea: user.focusArea,
  age: user.age,
  collegeName: user.collegeName,
  year: user.year,
  branch: user.branch,
  skills: user.skills,
  careerGoal: user.careerGoal,
  preferredJobType: user.preferredJobType,
});

const sendServerError = (res, message, error) =>
  res.status(500).json({
    success: false,
    message,
    error: error.message,
  });

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      targetRole,
      focusArea,
      age,
      role,
      collegeName,
      year,
      branch,
    } = req.body ?? {};

    const normalizedEmail = normalizeEmail(email);
    const trimmedName = name?.trim();
    const trimmedTargetRole = targetRole?.trim();
    const trimmedFocusArea = focusArea?.trim();
    const normalizedAccountRole =
      role && ["student", "professional", "admin"].includes(role)
        ? role
        : undefined;

    if (!trimmedName || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedAccountRole,
      targetRole: trimmedTargetRole,
      focusArea: trimmedFocusArea,
      age,
      collegeName: collegeName?.trim(),
      year,
      branch: branch?.trim(),
    });

    const token = createAuthToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    return sendServerError(res, "Signup failed", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createAuthToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    return sendServerError(res, "Login failed", error);
  }
};

export const logout = (_req, res) =>
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body ?? {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = hashResetToken(resetToken);
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    return sendServerError(res, "Forgot password failed", error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body ?? {};

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const hashedToken = hashResetToken(token.trim());

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return sendServerError(res, "Reset password failed", error);
  }
};

export const getProfile=async (req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Profile fetched successfully",
      user: formatUserResponse(user),
    })
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
}
export const updateProfile = async (req, res) => {
   try {
    const userId=req.user.id;
    const {
      name,
      role,
      age,
      collegeName,
      year,
      branch,
      targetRole,
      focusArea,
      skills,
      careerGoal,
      preferredJobType,
    } = req.body ?? {};
    const updateData={
      name: normalizeText(name),
      role,
      age,
      collegeName: normalizeText(collegeName),
      year,
      branch: normalizeText(branch),
      targetRole: normalizeText(targetRole),
      focusArea: normalizeText(focusArea),
      skills: normalizeSkills(skills),
      careerGoal: normalizeText(careerGoal),
      preferredJobType: normalizeText(preferredJobType),
    };
    Object.keys(updateData).forEach((key) => {
      if(updateData[key] === undefined){
        delete updateData[key];
      }
    });
    if(updateData.age!==undefined){
      updateData.age=Number(updateData.age)
      if (Number.isNaN(updateData.age)) {
        return res.status(400).json({
          success: false,
          message: "Age must be a valid number",
        });
      }
    }
    if(updateData.year!==undefined){
      updateData.year=Number(updateData.year)
      if (Number.isNaN(updateData.year)) {
        return res.status(400).json({
          success: false,
          message: "Year must be a valid number",
        });
     }
    }
     const user = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

     if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

     return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: formatUserResponse(user),
    });
   } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
   }
}
