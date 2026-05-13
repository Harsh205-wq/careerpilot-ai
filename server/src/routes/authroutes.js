import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,getProfile
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", protect, getProfile);

export default router;
