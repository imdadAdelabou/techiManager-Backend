"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const db = require("../configs/firebase").db;
//Firstname => Nom de famille
//Lastname => Prénom
function addVisitor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keys = req.body;
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "visitors"), keys);
            return res.status(201).json({ msg: "Visitor created" });
        }
        catch (e) {
            return res.status(500).json({ msg: "Internal server error", errors: e });
        }
    });
}
function getVisitors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const visitors = [];
        try {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(db, "visitors"));
            querySnapshot.forEach((doc) => visitors.push(doc.data()));
            return res.status(200).json({ msg: "success", data: visitors });
        }
        catch (e) {
            return res.status(500).json({ msg: "Internal server error", errors: e });
        }
    });
}
module.exports = { addVisitor: addVisitor, getVisitors: getVisitors };
