const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

const { errorHandler } = require("../helpers/dbErrorHandler");

const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { smartTrim } = require("../helpers/blog");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "image did not upload" });
    }

    const { title, body, categories, tags } = fields;

    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (!title || !title.length) {
      return res.status(400).json({ error: "title is required" });
    }
    if (!body || !body.length > 200) {
      return res.status(400).json({ error: "content is too short" });
    }
    if (!categories || !categories.length === 0) {
      return res
        .status(400)
        .json({ error: "blog post requires at least one category" });
    }
    if (!tags || !tags.length === 0) {
      return res
        .status(400)
        .json({ error: "blog post requires at least one tag" });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.excerpt = smartTrim(body, 320, " ", "... ");
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({ error: "image size must be < 1mb" });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: errorHandler(err) });
      }
      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: errorHandler(err) });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({ error: errorHandler(err) });
            } else {
              return res.json(result);
            }
          });
        }
      });
    });
  });
};

exports.list = (req, res) => {
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      } else {
        res.json(data);
      }
    });
};
exports.listAllBlogsCategoriesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      blogs = data;
      Category.find({}).exec((err, data) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }
        categories = data;
        Tag.find({}).exec((err, data) => {
          if (err) {
            return res.json({
              error: errorHandler(err),
            });
          } else {
            tags = data;
            return res.json({ blogs, categories, tags, size: blogs.length });
          }
        });
      });
    });
};
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title body slug  categories tags postedBy createdAt updatedAt mtitle mdesc"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};
exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndDelete({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Blog successfully deleted" });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "image did not upload" });
      }

      let slugFromBeforeMerge = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = slugFromBeforeMerge;

      const { body, desc, categories, tags } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
        oldBlog.desc = stripHtml(body.substr(0, 160));
      }

      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      if (tags) {
        oldBlog.tags = tags.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({ error: "image size must be < 1mb" });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        result.photo = undefined;
        res.json(result);
      });
    });
  });
};

exports.photo = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({ slug })
    .select("photo")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.set("Content-Type", blog.photo.contentType);
      return res.send(blog.photo.data);
    });
};
