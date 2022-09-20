const router = require("express").Router();
const authCtrl = require("../controllers/auth");
const middlewares = require("../middlewares/checkLoginParams");
const checkInputSiginUp = require("../middlewares/checkSignUpParams");

router.post("/login", middlewares.checkLoginParams, authCtrl.logIn);
router.post("/sign-up", checkInputSiginUp.checkSignUpParams, authCtrl.signUp);

module.exports = router;
