import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminMenu = () => {
  const path = useLocation();

  return (
    <div id="admin-menu">
      <ul className="admin-list">
        <h2 className="admin-list-heading" style={{ marginBottom: "0px" }}>
          Admin Panel
        </h2>
        <Link to="/dashboard/admin/create-category">
          <li
            className={`admin-list-item ${
              path.pathname === "/dashboard/admin/create-category"
                ? "admin-menu-active"
                : ""
            }`}
          >
            Manage Category
          </li>
        </Link>
        <Link to="/dashboard/admin/create-product">
          <li
            className={`admin-list-item ${
              path.pathname === "/dashboard/admin/create-product"
                ? "admin-menu-active"
                : ""
            }`}
          >
            Create Product
          </li>
        </Link>
        <Link to="/dashboard/admin/products">
          <li
            className={`admin-list-item ${
              path.pathname === "/dashboard/admin/products"
                ? "admin-menu-active"
                : ""
            }`}
          >
            All Products
          </li>
        </Link>{" "}
        <Link to="/dashboard/admin/orders">
          <li
            className={`admin-list-item ${
              path.pathname === "/dashboard/admin/orders"
                ? "admin-menu-active"
                : ""
            }`}
          >
            Orders
          </li>
        </Link>
        <Link to="/dashboard/admin/users">
          <li
            className={`admin-list-item ${
              path.pathname === "/dashboard/admin/users"
                ? "admin-menu-active"
                : ""
            }`}
          >
            Users
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminMenu;
