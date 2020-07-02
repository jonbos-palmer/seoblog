const router = require("express").Router();
const { time } = require("../controllers/blog");

router.get("/", time);

module.exports = router;