import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import { AuthContext } from "../../context/auth";

const Header = () => {
  const path = useLocation();
  const {user, details, handleLogout}=useContext(AuthContext)

  return (
    <nav>
      <div id="header">
          <Link className="color" id="main-icon" to="/">
          ShopMonk
          </Link>

        <ul className="list">
        <div className="dropdown">
        <span className="dropbtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span>
        <div className="dropdown-content">
          <Link className={`list-item color hover-item ${path.pathname === "/"? 'active':``}`} to="/">
            <li>Home</li>
          </Link>
          <Link className={`list-item color hover-item ${path.pathname === "/category"? 'active':``}`} to="/category">
            <li>Category</li>
          </Link>
          
          {user ? 
          (
            <><Link className={`list-item color hover-item ${path.pathname === "/dashboard" ? 'active' : ``}`} to="/dashboard">
                    <li>Dashboard</li>
                  </Link><Link onClick={handleLogout} className={`list-item color hover-item ${path.pathname === "/login" ? 'active' : ``}`} to="/login">
                      <li>Logout ({details.name})</li>
                    </Link></>):
          (<><Link className={`list-item color hover-item ${path.pathname === "/login" ? 'active' : ``}`} to="/login">
          <li>Login</li>
          </Link><Link className={`list-item color hover-item ${path.pathname === "/signup" ? 'active' : ``}`} to="/signup">
          <li>Signup</li>
          </Link></>)
          }
          
          <Link className={`list-item color hover-item ${path.pathname === "/cart"? 'active':``}`} to="/cart">
            <li>Cart {0}</li>
          </Link>
        </div>
        </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
