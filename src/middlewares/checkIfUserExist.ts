import { Request, Response } from "express";
import { collection, getDocs, query, where } from "firebase/firestore";

const db = require("../configs/firebase").db;
const usersRef = collection(db, "users");

export async function checkIfUserExist(email: string): Promise<boolean> {
  const querySearch = query(usersRef, where("email", "==", email));
  const users = [];

  try {
    const querySnaphot = await getDocs(querySearch);

    querySnaphot.forEach((doc) => {
      users.push(doc.data());
    });
    return users.length > 0 ? true : false;
  } catch (e) {
    return false;
  }
}
