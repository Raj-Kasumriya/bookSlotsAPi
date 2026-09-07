const express = require('express');
const router = express.Router();

const { signup, login, } = require("../controllers/AuthController");
const { signupValidation, loginValidation, } = require("../middlewares/AuthValidation")


router.post("/signup", signupValidation, signup)

router.post("/login", loginValidation, login)


module.exports = router;