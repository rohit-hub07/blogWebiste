import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/category.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8000"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(express({ urlencoded: true }));

const port = process.env.PORT;

db();

app.get("/", (req, res) => {
  return res.send("Hello from the server 8000");
});

app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
  console.log(`App is listen to port: ${port}`);
});
