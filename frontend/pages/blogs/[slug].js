import Head from "next/head";
import Layout from "../../components/Layout";
import { useState } from "react";
import { singleBlog } from "../../actions/blog";
import Link from "next/link";
import { API, DOMAIN, APP_NAME } from "../../config";

const SingleBlog = ({ router, blog }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div style={{ marginTop: "-30px" }} className="row">
                  <img
                    src={`${API}/blog/photo/${blog.slug}/`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};
SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};
export default SingleBlog;
