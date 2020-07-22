import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";

const Blogs = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <header>
          <div className="col-md-12 pt-3">
            <h1 className="display-4 font-weight-bold text-center">
              Programming Blogs and Tutorials
            </h1>
          </div>
          <section>
            <p>Show categories and tags</p>
          </section>
        </header>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">Show all blogs</div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
