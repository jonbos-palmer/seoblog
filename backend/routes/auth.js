const router = require("express").Router();
const { signup, signin } = require("../controllers/auth");

//validators
const { runValidation } = require("../validators/");
const {
    userSignupValidator,
    userSignInValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/signin", userSignInValidator, runValidation, signin);

module.exports = router;