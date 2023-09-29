import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { AuthContext } from "../../context/auth";
import UserMenu from "./UserMenu";

const Dashboard = () => {
  const {details} = useContext(AuthContext)

  return (
    <Layout title="Dashboard - ShopMonk">
      <div style={{ display: "flex", marginTop: '1rem' }}>
        <div>
          <UserMenu />
        </div>
        <div className="admin-content">
          <p>User Name: {details?.name}</p>
          <p>User Email: {details?.email}</p>
          <p>User Contact: {details?.phone}</p>
          </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
