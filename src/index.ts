import { Request, Response } from "express";
import bodyParser from "body-parser";
import { corsOpts } from "./helpers/constant";

require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/auth");
const visitorRoute = require("./routes/visitor");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOpts));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response, next: () => void) =>
  res.send("Welcome to techiMa-Manager API.")
);
app.use("/api/auth", authRoute);
app.use("/api/visitor", visitorRoute);

app.listen(PORT, () => console.log("Listen"));
