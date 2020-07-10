import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";
import { get, set } from "js-cookie";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category created </p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exists </p>;
    }
  };
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category removed </p>;
    }
  };

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          reload: !reload,
          removed: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      errors: false,
      success: false,
      removed: "",
    });
  };

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((cat, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(cat.slug)}
          title="Double click to delete"
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          key={i}
        >
          {cat.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };
  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>{newCategoryForm()}</div>
      {showCategories()}
    </React.Fragment>
  );
};

export default Category;
