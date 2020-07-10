const Tag = require("../models/Tag");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug;
  Tag.findOne({ slug: slug }).exec((err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug;
  Tag.findOneAndDelete({ slug: slug }, (err, data) => {
    if (err) {
      return res, status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "deletion successful" });
  });
};
