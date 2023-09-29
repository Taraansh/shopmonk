import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminMenu = () => {
  const path = useLocation();
  useEffect(() => {
    console.log(path)
  }, [path])
  
  return (
    <div  id="admin-menu">
      <ul className="admin-list">
      <h2 className="admin-list-heading">Admin Panel</h2>
        <Link to="/dashboard/admin/create-category">
          <li className={`admin-list-item ${path.pathname==='/dashboard/admin/create-category'?'admin-menu-active':''}`}>Create Category</li>
        </Link>
        <Link to="/dashboard/admin/create-product">
          <li className={`admin-list-item ${path.pathname==='/dashboard/admin/create-product'?'admin-menu-active':''}`}>Create Product</li>
        </Link>
        <Link to="/dashboard/admin/users">
          <li className={`admin-list-item ${path.pathname==='/dashboard/admin/users'?'admin-menu-active':''}`}>Users</li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminMenu;
