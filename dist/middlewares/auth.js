"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.query.token;
    //We verify if user send request with valid token
    if (!token) {
        return res
            .status(403)
            .json({ msg: "Token is required for authentification" });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.body.user = decoded;
    }
    catch (e) {
        return res.status(401).json({ msg: "Invalid token" });
    }
    next();
};
exports.auth = auth;
