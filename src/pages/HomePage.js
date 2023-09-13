import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { AuthContext } from "../context/auth";

const HomePage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Layout>
      <h1>Homepage</h1>
      <p>Hello</p>
      <p>{JSON.stringify(auth, null, 4)}</p>
    </Layout>
  );
};

export default HomePage;
