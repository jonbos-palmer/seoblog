import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create } from "../../actions/category";
import { get, set } from "js-cookie";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
  });

  const { name, error, success, categories, removed } = values;
  const token = getCookie("token");

  const clickSubmit = (e) => {
    e.preventDefault();
    console.log("create category ", name);
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
  return <React.Fragment>{newCategoryForm()}</React.Fragment>;
};

export default Category;
