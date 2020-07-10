const router = require("express").Router();
const { runValidation } = require("../validators");
import { create } from "../controllers/category";
const { categoryValidator } = require("../validators/category");
import { requireSignin, adminMiddleware } from "../controllers/auth";

router.post(
  "/category",
  categoryValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
module.exports = router;
