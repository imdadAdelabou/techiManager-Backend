const routerVisitor = require("express").Router();
const visitorCtrl = require("../controllers/visitor");
routerVisitor.post("/create-visitor", visitorCtrl.addVisitor);
routerVisitor.get("/visitors", visitorCtrl.getVisitors);
module.exports = routerVisitor;
