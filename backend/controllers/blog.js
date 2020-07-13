const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

const { errorHandler } = require("../helpers/dbErrorHandler");

const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");

exports.create = (req, res) => {
  res.json({ time: Date().toString() });
};
