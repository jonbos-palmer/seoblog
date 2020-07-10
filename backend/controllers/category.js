const Category = require("../models/Category");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug;
  Category.findOne({ slug: slug }).exec((err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug;
  Category.findOneAndDelete({ slug: slug }, (err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "deletion successful" });
  });
};
