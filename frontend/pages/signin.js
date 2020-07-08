import Layout from "../components/Layout";
import Link from "next/link";
import SigninComponent from "../components/auth/SigninComponent";
const Signin = () => (
  <Layout>
    <div className="col-md-6 offset-md-3 pt-4 pb-4">
      <h2 className="text-center">Sign Up</h2>
      <SigninComponent />
    </div>
  </Layout>
);
export default Signin;
