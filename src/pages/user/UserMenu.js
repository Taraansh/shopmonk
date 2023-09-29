import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserMenu = () => {
  const path = useLocation();
  
  return (
    <div  id="user-menu">
      <ul className="user-list">
      <h2 className="user-list-heading">Dashboard</h2>
        <Link to="/dashboard/user/profile">
          <li className={`user-list-item ${path.pathname==='/dashboard/user/profile'?'user-menu-active':''}`}>Profile</li>
        </Link>
        <Link to="/dashboard/user/orders">
          <li className={`user-list-item ${path.pathname==='/dashboard/user/orders'?'user-menu-active':''}`}>Orders</li>
        </Link>
      </ul>
    </div>
  );
};

export default UserMenu;
