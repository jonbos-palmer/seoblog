const router = require("express").Router();

const { create, list, read, remove } = require("../controllers/tag");
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { runValidation } = require("../validators");
const { tagValidator } = require("../validators/tag");

router.post("/tag", tagValidator, runValidation, requireSignin, create);
module.exports = router;

// get all categories
router.get("/tags", list);

// get one category
router.get("/tag/:slug", read);

// delete a category
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);
