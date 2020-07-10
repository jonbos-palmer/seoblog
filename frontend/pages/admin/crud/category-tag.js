import Layout from "../../../components/Layout";
import Link from "next/link";
import Admin from "../../../components/auth/Admin";

const CategoryTag = () => (
  <Layout>
    <Admin>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Manage Categories and Tags</h2>
          </div>
          <div className="col-md-4">
            <p>Categories </p>
          </div>
          <div className="col-md-8">
            <p>Tags</p>
          </div>
        </div>
      </div>
    </Admin>
  </Layout>
);
export default CategoryTag;
