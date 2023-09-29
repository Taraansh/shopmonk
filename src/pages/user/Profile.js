import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";

const Profile = () => {
  return (
    <Layout title="My Profile - ShopMonk">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div>
          <UserMenu />
        </div>
        <div className="user-content" style={{ textAlign: "center" }}>
          <h1>My Profile</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
