import { auth } from "../middlewares/auth";
import { isAdminOrGarden } from "../middlewares/isAdminOrGarden";

const routerVisitor = require("express").Router();
const visitorCtrl = require("../controllers/visitor");

routerVisitor.post("/create-visitor?", visitorCtrl.addVisitor);
routerVisitor.get("/visitors?", auth, visitorCtrl.getVisitors);

module.exports = routerVisitor;
