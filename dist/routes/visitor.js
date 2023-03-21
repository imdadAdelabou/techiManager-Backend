"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerVisitor = require("express").Router();
const visitorCtrl = require("../controllers/visitor");
const auth_1 = require("../middlewares/auth");
const isAdminOrGarden_1 = require("../middlewares/isAdminOrGarden");
routerVisitor.post("/create-visitor?", auth_1.auth, isAdminOrGarden_1.isAdminOrGarden, visitorCtrl.addVisitor);
routerVisitor.get("/visitors", visitorCtrl.getVisitors);
// auth, isAdminOrGarden
module.exports = routerVisitor;
