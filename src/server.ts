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

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

export default app;
