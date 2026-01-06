const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

/* BLOG CRUD */

exports.store = async (req, res) => {
  const { blog_name, blog_topic, blog_summary, author_name } = req.body;

  await Blog.create({
    blog_name,
    blog_topic,
    blog_summary,
    author_name,
    cover_image: req?.file?.filename || null,
  });

  res.json({ success: true, message: "Blog created" });
};

exports.index = async (req, res) => {
  const records = await Blog.find();
  res.json({ success: true, records });
};

exports.update = async (req, res) => {
  const { id } = req.query;

  const data = { ...req.body };

  if (req.file) {
    data.cover_image = req.file.filename;
  }

  await Blog.findByIdAndUpdate(id, data);

  res.json({ success: true, message: "Blog updated" });
};

exports.trash = async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id);

  if (blog?.cover_image) {
    const imgPath = path.join(
      __dirname,
      "../uploads",
      blog.cover_image
    );
    fs.unlink(imgPath, () => {});
  }

  await Blog.findByIdAndDelete(id);

  res.json({ success: true, message: "Deleted" });
};

/* AUTH (DUMMY – SAME AS YOURS) */

exports.signUp = (req, res) => {
  res.json({ success: true, message: "Signup successful" });
};

exports.login = (req, res) => {
  req.session.user = true;
  res.json({ success: true, message: "Login successful" });
};

exports.checkAuth = (req, res) => {
  res.json({ success: !!req.session.user });
};
