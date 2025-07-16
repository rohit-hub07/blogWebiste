import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/category.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = express();

const corsOptions = {
  origin: [
    "https://myblogs-backend-91ie.onrender.com",
    "https://myblogs-backend-91ie.onrender.com/",
    "https://my-blogs-frontend.vercel.app",
    "http://localhost:8000",
    "http://localhost:5173",
  ],
  credentials: true,
};

app.use(
  cors(corsOptions)
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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
app.use("/comments", commentRouter);


app.listen(port, () => {
  console.log(`App is listen to port: ${port}`);
});
