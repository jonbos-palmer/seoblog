import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories.map((cat, i) => (
      <Link key={i} href={`/categories/${cat.slug}`}>
        <a class="btn btn-primary mr-1 ml-1 mt-3">{cat.name}</a>
      </Link>
    ));
  };
  const showBlogTags = (blog) => {
    return blog.tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a class="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by {blog.postedBy.name} | Published{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
      </section>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>
          </section>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="btn btn-primary pt-2">Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
