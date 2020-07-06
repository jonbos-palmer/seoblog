const router = require("express").Router();
const { signup } = require("../controllers/auth");

//validators
const { runValidation } = require("../validators/");
const {
    userSignupValidator,
    userSignInValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/signin", userSignInValidator, runValidation, signup);

module.exports = router;