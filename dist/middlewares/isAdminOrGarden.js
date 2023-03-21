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
exports.isAdminOrGarden = exports.matching = void 0;
const types_1 = require("../helpers/types");
const checkIfUserExist_1 = require("./checkIfUserExist");
exports.matching = {
    garden: types_1.RoleType.garden,
    admin: types_1.RoleType.admin,
    user: types_1.RoleType.user,
};
const isAdminOrGarden = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, checkIfUserExist_1.checkIfUserExist)(req.body.user.email);
    if (typeof user === "boolean")
        return res.status(404).json({ msg: "Inexistant user" });
    if (exports.matching[user.role] === types_1.RoleType.user)
        return res.status(401).json({
            msg: "You don't have sufficent acces on this path",
            errors: { keys: ["is-not-garden-or-admin"] },
        });
    next();
});
exports.isAdminOrGarden = isAdminOrGarden;
