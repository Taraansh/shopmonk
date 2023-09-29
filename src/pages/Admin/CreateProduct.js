import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title="Dashboard - Create Product">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="create-product-content" className="admin-content">
          product
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
