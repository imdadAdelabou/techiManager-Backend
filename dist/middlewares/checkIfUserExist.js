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
exports.checkIfUserExist = void 0;
const firestore_1 = require("firebase/firestore");
const db = require("../configs/firebase").db;
const usersRef = (0, firestore_1.collection)(db, "users");
// Promise<boolean>
function checkIfUserExist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const querySearch = (0, firestore_1.query)(usersRef, (0, firestore_1.where)("email", "==", email));
        const users = [];
        try {
            const querySnaphot = yield (0, firestore_1.getDocs)(querySearch);
            querySnaphot.forEach((doc) => {
                users.push(doc.data());
            });
            return users.length > 0 ? users[0] : false;
        }
        catch (e) {
            return false;
        }
    });
}
exports.checkIfUserExist = checkIfUserExist;
