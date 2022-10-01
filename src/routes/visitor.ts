const routerVisitor = require("express").Router();
const visitorCtrl = require("../controllers/visitor");
import { auth } from "../middlewares/auth";
import { isAdminOrGarden } from "../middlewares/isAdminOrGarden";

routerVisitor.post(
  "/create-visitor",
  auth,
  isAdminOrGarden,
  visitorCtrl.addVisitor
);
routerVisitor.get("/visitors", auth, isAdminOrGarden, visitorCtrl.getVisitors);
module.exports = routerVisitor;
