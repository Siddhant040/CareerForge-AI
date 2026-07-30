import express from "express";
console.log("1. Express imported");

const app = express();
console.log("2. Express app created");

import cors from "cors";
console.log("3. CORS imported");

import cookieParser from "cookie-parser";
console.log("4. Cookie Parser imported");

import dotenv from "dotenv";
dotenv.config();
console.log("5. Dotenv loaded");

console.log("6. Reading URLS env...");
const allowedOrigins = process.env.URLS.split(",").map(origin => origin.trim());
console.log("7. Allowed Origins:", allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log("8. CORS Options Created");

app.use(cors(corsOptions));
console.log("9. CORS Middleware Registered");

// Middleware
app.use(express.json({ limit: "16kb" }));
console.log("10. JSON Middleware Registered");

app.use(express.urlencoded({ limit: "16kb", extended: true }));
console.log("11. URL Encoded Middleware Registered");

app.use(express.static("public"));
console.log("12. Static Middleware Registered");

app.use(cookieParser());
console.log("13. Cookie Parser Middleware Registered");

// Routes
console.log("14. Importing Routes...");

import { errorHandler } from "./middleware/error.middleware.js";
console.log("15. Error Middleware Imported");

import healthCheckRoutes from "./modules/healthCheck/healthCheck.routes.js";
console.log("16. Health Route Imported");

import authRoutes from "./modules/user/user.routes.js";
console.log("17. Auth Route Imported");

import interviewRoutes from "./modules/Interview/interviewReport.route.js";
console.log("18. Interview Route Imported");

app.use("/api/v1/healthCheck", healthCheckRoutes);
console.log("19. Health Route Registered");

app.use("/api/v1/auth", authRoutes);
console.log("20. Auth Route Registered");

app.use("/api/v1/interviewReport", interviewRoutes);
console.log("21. Interview Route Registered");

app.use(errorHandler);
console.log("22. Error Handler Registered");

console.log("23. App Initialized Successfully");

export default app;