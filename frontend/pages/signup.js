import Layout from "../components/Layout";
import Link from "next/link";

const Signup = () => (
  <Layout>
    <h2>Signup Page</h2>
    <Link href="/signin">
      <a>Sign In</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home</a>
    </Link>
  </Layout>
);
export default Signup;
