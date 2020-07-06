const router = require("express").Router();
const {
    signup,
    signin,
    signout,
    requireSignin,
} = require("../controllers/auth");

//validators
const { runValidation } = require("../validators/");
const {
    userSignupValidator,
    userSignInValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/signin", userSignInValidator, runValidation, signin);

router.get("/signout", requireSignin, signout);

router.get("/secret", requireSignin, (req, res) => {
    res.json({
        message: "you have access",
    });
});

module.exports = router;