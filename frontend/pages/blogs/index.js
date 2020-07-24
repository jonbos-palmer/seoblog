import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import Link from "next/link";
const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };
  const showAllTags = (tags) => {
    return tags.map((tag, i) => {
      return (
        <Link href={`/tags/${tag.slug}`} key={i}>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
        </Link>
      );
    });
  };
  const showAllCategories = (categories) => {
    return categories.map((cat, i) => {
      return (
        <Link href={`/categories/${cat.slug}`} key={i}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{cat.name}</a>
        </Link>
      );
    });
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming Blogs and Tutorials
              </h1>
            </div>
            <section>
              <div className="pb-5 text-center">
                {showAllCategories(categories)}
                <br />
                {showAllTags(tags)}
              </div>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};
export default Blogs;
