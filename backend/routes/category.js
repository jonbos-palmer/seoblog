const { create } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const router = require("express").Router();
const { runValidation } = require("../validators");
const { categoryValidator } = require("../validators/category");

router.post(
  "/category",
  categoryValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
module.exports = router;
