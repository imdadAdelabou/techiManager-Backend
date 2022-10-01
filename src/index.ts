require("dotenv").config();
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { corsOpts } from "./helpers/constant";
import { auth } from "./middlewares/auth";
import { me } from "./controllers/me";

const express = require("express");
const authRoute = require("./routes/auth");
const visitorRoute = require("./routes/visitor");
const codeRoute = require("./routes/code");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOpts));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response, next: () => void) =>
  res.send("Welcome to techiMa-Manager API.")
);
app.use("/api/auth", authRoute);
app.get("/api/me", auth, me);
app.use("/api/visitor", visitorRoute);
app.use("/api/code", codeRoute);

app.listen(PORT, () => console.log("Listen"));
