import mongoose from "mongoose";

export const db = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1/blogWebsite")
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Error connecting to DB!", err);
    });
};
