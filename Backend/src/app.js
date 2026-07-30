import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config()



const allowedOrigins = process.env.URLS.split(",").map(origin => origin.trim());

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

app.use(cors(corsOptions));

//middleware configuration

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"))

// CORS + cookies should be applied before routes so preflight requests are handled
app.use(cors(corsOptions));

app.use(cookieParser())


// routes
import {errorHandler} from "./middleware/error.middleware.js"
import healthCheckRoutes from "./modules/healthCheck/healthCheck.routes.js";
import authRoutes from "./modules/user/user.routes.js"
import interviewRoutes from "./modules/Interview/interviewReport.route.js"






app.use("/api/v1/healthCheck", healthCheckRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/interviewReport",interviewRoutes)
app.use(errorHandler)


export default app
