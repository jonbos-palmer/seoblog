import Layout from "../components/Layout";
import Link from "next/link";
const Index = () => (
  <Layout>
    <h2>Home Page</h2>
    <Link href="/signup">
      <a>Sign Up</a>
    </Link>
    <br />
    <Link href="/signin">
      <a>Sign In</a>
    </Link>
  </Layout>
);
export default Index;
