import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser"



const allowedOrigin = process.env.Url?.replace(/\/$/, "") || "http://localhost:5173";
const corsOptions = {
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

//middleware configuration

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"))


// routes
import {errorHandler} from "./middleware/error.middleware.js"
import healthCheckRoutes from "./modules/healthCheck/healthCheck.routes.js";
import authRoutes from "./modules/user/user.routes.js"


app.use("/api/v1/healthCheck", healthCheckRoutes)
app.use("/api/v1/auth",authRoutes)
app.use(errorHandler)




//cors configuration 
app.use(cors(corsOptions));
app.use(cookieParser())


export default app
