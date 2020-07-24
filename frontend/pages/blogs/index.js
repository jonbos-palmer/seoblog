import Head from "next/head";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import Link from "next/link";
import { withRouter } from "next/router";
import { API, DOMAIN, APP_NAME } from "../../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogLimit,
  blogSkip,
  router,
}) => {
  const head = () => {
    return (
      <Head>
        <title>Programming Blogs | {APP_NAME}</title>
        <meta
          name="description"
          content="programming blogs and tutorials on React node next vue laravel"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Latest Development Tutorials | ${APP_NAME}`}
        />
        <meta
          property="og:description"
          content={`Latest Development Tutorials | ${APP_NAME}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content="/static/images/blog/main.jpg" />
        <meta
          property="og:image:secure_url"
          content="/static/images/blog/main.jpg"
        />
        <meta property="og:image_type" content="image/jpg" />
      </Head>
    );
  };
  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(blogSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, index) => {
      return (
        <article key={index}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load More
        </button>
      )
    );
  };

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
    <React.Fragment>
      {head()}
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
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center py-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};
Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 1;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};
export default withRouter(Blogs);
