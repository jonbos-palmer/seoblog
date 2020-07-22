import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import Dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { setLocalStorage } from "./../../actions/auth";

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const [body, setBody] = useState(blogFromLS());

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCats, setcheckedCats] = useState([]);
  const [checkedTags, setcheckedTags] = useState([]);

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  useEffect(() => {
    initCategories();
    initTags();
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", event);
    if (typeof window !== undefined) {
      localStorage.setItem("blog", JSON.stringify(body));
    }
  };

  const handleToggleCat = (id) => () => {
    setValues({ ...values, error: "" });
    // return first index or -1
    const clickedCategory = checkedCats.indexOf(id);
    const all = [...checkedCats];

    if (clickedCategory === -1) {
      all.push(id);
    } else {
      all.splice(clickedCategory, 1);
    }

    setcheckedCats(all);
    formData.set("categories", all);
  };

  const handleToggleTag = (id) => () => {
    setValues({ ...values, error: "" });
    // return first index or -1
    const clickedTag = checkedTags.indexOf(id);
    const all = [...checkedTags];

    if (clickedTag === -1) {
      all.push(id);
    } else {
      all.splice(clickedTag, 1);
    }

    setcheckedTags(all);
    formData.set("tags", all);
  };
  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li onChange={handleToggleCat(c._id)} className="list-unstyled" key={i}>
          <input type="checkbox" className="mr-2" />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li onChange={handleToggleTag(t._id)} className="list-unstyled" key={i}>
          <input type="checkbox" className="mr-2" />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            value={title}
            type="text"
            className="form-control"
            onChange={handleChange(title)}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            formats={CreateBlog.formats}
            modules={CreateBlog.modules}
            value={body}
            placeholder="Make some magic"
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Publish
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>
        <div className="col-md-4">
          <div>
            <h5>Categories</h5>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <hr />
          <div>
            <h5>Tags</h5>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
export default withRouter(CreateBlog);
