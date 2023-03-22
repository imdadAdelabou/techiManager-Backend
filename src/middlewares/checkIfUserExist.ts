import { Request, Response } from "express";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "../helpers/types";

const db = require("../configs/firebase").db;

interface CheckUser {
  exist: boolean;
  userId: string;
}

// Promise<boolean>
export async function checkIfUserExist(
  email: string,
  collectionName?: string
): Promise<boolean | User> {
  const usersRef = collection(db, collectionName || "users");
  const querySearch = query(usersRef, where("email", "==", email));
  const users = [];

  try {
    const querySnaphot = await getDocs(querySearch);

    querySnaphot.forEach((doc) => {
      users.push(doc.data());
    });
    return users.length > 0 ? users[0] : false;
  } catch (e) {
    return false;
  }
}
