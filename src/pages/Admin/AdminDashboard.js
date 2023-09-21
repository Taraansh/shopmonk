import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="content">content</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
