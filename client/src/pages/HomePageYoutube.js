import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
const HomePageYoutube = () => {
  const [auth, setAuth] = useAuth();
  return <Layout title="HomePage"><div className="auth-info">
  <h3>Authentication Information</h3>
  <pre>{JSON.stringify(auth, null, 2)}</pre>
</div>HomePageYoutube</Layout>;
};

export default HomePageYoutube;
