import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";

const Orders = () => {
  return (
    <Layout title="My Orders - ShopMonk">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div>
          <UserMenu />
        </div>
        <div className="user-content" style={{ textAlign: "center" }}>
          <h1>All Orders</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
