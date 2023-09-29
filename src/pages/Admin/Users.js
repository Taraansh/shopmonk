import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const Users = () => {
  return (
    <Layout title="Dashboard - All Users">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="admin-users" className="admin-content">
          user
        </div>
      </div>
    </Layout>
  );
};

export default Users;
