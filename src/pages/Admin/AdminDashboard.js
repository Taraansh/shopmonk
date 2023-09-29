import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { AuthContext } from "../../context/auth";

const AdminDashboard = () => {
  const {details} = useContext(AuthContext)
  return (
    <Layout>
      <div style={{ display: "flex", marginTop: '1rem' }}>
        <div>
          <AdminMenu />
        </div>
        <div className="admin-content">
          <p>Admin Name: {details?.name}</p>
          <p>Admin Email: {details?.email}</p>
          <p>Admin Contact: {details?.phone}</p>
          </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
