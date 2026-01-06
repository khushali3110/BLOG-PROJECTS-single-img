const { Schema, model } = require("mongoose");
const common = require("./common");

const blogSchema = new Schema(
  {
    blog_name: common,
    blog_topic: common,
    blog_summary: { ...common, required: false },
    author_name: common,
    cover_image: { ...common, required: false },
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
