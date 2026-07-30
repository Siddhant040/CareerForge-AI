import dotenv from "dotenv";
dotenv.config();

console.log("A. Server Starting");

import app from "./app.js";
console.log("B. App Imported");

import connectDB from "./config/db.config.js";
console.log("C. DB Config Imported");

const PORT = process.env.PORT || 5000;

console.log("D. Connecting MongoDB");

console.log("PORT from env:", process.env.PORT);
console.log("PORT variable:", PORT);




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