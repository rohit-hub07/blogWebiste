import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Error connecting to DB!", err);
    });
};
