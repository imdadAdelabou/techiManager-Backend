import { Request, Response } from "express";
import { collection, addDoc, getDocs } from "firebase/firestore";

const db = require("../configs/firebase").db;

//Firstname => Nom de famille
//Lastname => Prénom
async function addVisitor(req: Request, res: Response, next: () => void) {
  try {
    const keys = req.body;
    const docRef = await addDoc(collection(db, "visitors"), keys);

    return res.status(201).json({ msg: "Visitor created" });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error", errors: e });
  }
}

async function getVisitors(req: Request, res: Response, next: () => void) {
  const visitors = [];

  try {
    const querySnapshot = await getDocs(collection(db, "visitors"));

    querySnapshot.forEach((doc) => visitors.push(doc.data()));
    return res.status(200).json({ msg: "success", data: visitors });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error", errors: e });
  }
}

module.exports = { addVisitor: addVisitor, getVisitors: getVisitors };
