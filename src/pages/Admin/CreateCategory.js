import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title="Dashboard - Create Category">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="create-category-content" className="admin-content">
          hello
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
