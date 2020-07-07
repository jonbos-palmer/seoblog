import Layout from "../components/Layout";
import Link from "next/link";
import moduleName from "../components/auth/SignupComponent";
import SignupComponent from "../components/auth/SignupComponent";
const Signup = () => (
  <Layout>
    <div className="col-md-6 offset-md-3 pt-4 pb-4">
      <h2 className="text-center">Sign Up</h2>
      <SignupComponent />
    </div>
  </Layout>
);
export default Signup;
