const { create, list, read, remove } = require("../controllers/category");
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

// get all categories
router.get("/categories", list);

// get one category
router.get("/category/:slug", read);

// delete a category
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);
