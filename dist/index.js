"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const constant_1 = require("./helpers/constant");
const auth_1 = require("./middlewares/auth");
const me_1 = require("./controllers/me");
require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/auth");
const visitorRoute = require("./routes/visitor");
const codeRoute = require("./routes/code");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(constant_1.corsOpts));
app.use(body_parser_1.default.json());
app.get("/", (req, res, next) => res.send("Welcome to techiMa-Manager API."));
app.use("/api/auth", authRoute);
app.get("/api/me", auth_1.auth, me_1.me);
app.use("/api/visitor", visitorRoute);
app.use("/api/code", codeRoute);
app.listen(PORT, () => console.log("Listen"));
