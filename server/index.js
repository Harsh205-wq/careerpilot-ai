import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authroutes.js";
import healthcheckRoutes from "./src/routes/healthcheckRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, ".env");

dotenv.config({ path: envPath });

const PORT = process.env.PORT || 5000;

const createApp = () => {
  const app = express();

  // Enables the local Vite client to call the API directly during development.
  app.use(cors());
  // Parses JSON request bodies so data sent as application/json is available on req.body.
  app.use(express.json());
  // Parses form data so values sent as application/x-www-form-urlencoded are available on req.body.
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.send("Welcome to the careerpilot ai");
  });

  app.use("/api/health", healthcheckRoutes);
  app.use("/api/auth", authRoutes);

  return app;
};

const app = createApp();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

export default app;
