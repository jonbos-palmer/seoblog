import Layout from "../components/Layout";
import Link from "next/link";
const Signin = () => (
  <Layout>
    <h2>Signin Page</h2>
    <Link href="/signup">
      <a>Sign Up</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home</a>
    </Link>
  </Layout>
);
export default Signin;
