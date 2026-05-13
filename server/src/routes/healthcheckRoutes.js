import express from "express";
import { getHealthcheck } from "../controllers/healthcheckControllers.js";

const router = express.Router();

router.get("/", getHealthcheck);

export default router;
