import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div  id="admin-menu">
      <ul className="admin-list">
      <h2 className="admin-list-heading">Admin Panel</h2>
        <Link to="/dashboard/admin/create-category">
          <li className="admin-list-item">Create Category</li>
        </Link>
        <Link to="/dashboard/admin/create-product">
          <li className="admin-list-item">Create Product</li>
        </Link>
        <Link to="/dashboard/admin/users">
          <li className="admin-list-item">Users</li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminMenu;
