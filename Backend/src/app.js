import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

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



//cors configuration 
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
export default app
