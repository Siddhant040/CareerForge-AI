import dotenv from "dotenv";
dotenv.config();



import app from "./app.js";


import connectDB from "./config/db.config.js";


const PORT = process.env.PORT || 5000;



console.log("PORT from env:", process.env.PORT);





connectDB()
  .then(() => {
    console.log("E. Mongo Connected");

    app.listen(PORT, () => {
      console.log(`F. Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo Error:", err);
  });