import { check } from "express-validator";
exports.categoryValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
];
