import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../api";

const BlogApp = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);

  // 🔹 Add or Update Blog
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("blog_name", data.blog_name);
      formData.append("blog_topic", data.blog_topic);
      formData.append("blog_summary", data.blog_summary);
      formData.append("author_name", data.author_name);

      if (data.cover_image?.[0]) {
        formData.append("cover_image", data.cover_image[0]);
      }

      if (id === null) {
        await Api.post("/blog", formData);
        alert("Blog Added ✅");
      } else {
        await Api.put(`/blog/?id=${id}`, formData);
        alert("Blog Updated ✅");
        setId(null);
        setImage(null);
      }

      reset();
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  // 🔹 Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await Api.get("/blog");
      setBlogs(res.data.records || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🔹 Delete blog
  const deleteBlog = async (blogId) => {
    if (!confirm("Are you sure?")) return;
    try {
      await Api.delete(`/blog/${blogId}`);
      alert("Deleted ✅");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  // 🔹 Edit blog
  const editBlog = (blogId) => {
    setId(blogId);
    const blog = blogs.find((b) => b._id === blogId);
    if (blog) {
      setValue("blog_name", blog.blog_name);
      setValue("blog_topic", blog.blog_topic);
      setValue("blog_summary", blog.blog_summary);
      setValue("author_name", blog.author_name);
      if (blog.cover_image) {
        setImage(`${import.meta.env.VITE_IMAGE_URL}/${blog.cover_image}`);
      }
    }
  };

  // 🔹 Format Date
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="container my-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📄 Blog Management</h3>
        <span className="badge bg-primary">Total Blogs: {blogs.length}</span>
      </div>

      {/* FORM CARD */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          {id === null ? "Add New Blog" : "Update Blog"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Blog Name</label>
                <input
                  {...register("blog_name")}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Topic</label>
                <input
                  {...register("blog_topic")}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Summary</label>
                <textarea
                  {...register("blog_summary")}
                  className="form-control"
                  rows="3"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Author Name</label>
                <input
                  {...register("author_name")}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Cover Image</label>
                <input
                  {...register("cover_image")}
                  type="file"
                  className="form-control"
                  accept="image/*"
                />
              </div>

              {id !== null && image && (
                <div className="col-md-6 mb-3 text-center">
                  <label className="form-label">Preview</label>
                  <div>
                    <img
                      src={image}
                      alt="Preview"
                      className="img-thumbnail"
                      width="120"
                    />
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-success w-100">
              {id === null ? "Save Blog" : "Update Blog"}
            </button>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">Blog List</div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Topic</th>
                <th>Summary</th>
                <th>Author</th>
                <th>Image</th>
                <th>Created</th>
                <th>Updated</th>
                <th width="160">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No Blogs Found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>{blog.blog_name}</td>
                    <td>{blog.blog_topic}</td>
                    <td>{blog.blog_summary}</td>
                    <td>{blog.author_name}</td>
                    <td>
                      {blog.cover_image && (
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/${blog.cover_image}`}
                          width="60"
                          className="rounded"
                        />
                      )}
                    </td>
                    <td>{formatDate(blog.createdAt)}</td>
                    <td>{formatDate(blog.updatedAt)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => editBlog(blog._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogApp;
