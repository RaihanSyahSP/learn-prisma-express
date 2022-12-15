import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
// middleware (order matters) - morgan is a logger for http requests
// it will fire before the router
app.use(morgan("dev"));

// allows the client to send json to the server
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello World!" });
});

// app.get('/', (req, res, next) => {
//   setTimeout(() => {
//     next(new Error('Something went wrong'))
//   }, 1)
// })

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid Input" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
});

export default app;
