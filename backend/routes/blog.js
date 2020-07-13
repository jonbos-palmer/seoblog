const router = require("express").Router();

const { create } = require("../controllers/blog");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleware, create);

module.exports = router;
