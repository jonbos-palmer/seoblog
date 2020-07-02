const router = require("express").Router();
const { signup } = require("../controllers/auth");

//validators
const { runValidation } = require("../validators/");
const { userSignupValidator } = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);

module.exports = router;