import dotenv from "dotenv";
dotenv.config()



import app from "./app.js";
import connectDB from "./config/db.config.js";



const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDb:", error);
       
        process.exit(1);
    });

