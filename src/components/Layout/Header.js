import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import {GiShoppingBag} from "react-icons/gi"

const Header = () => {
  const path = useLocation();

  return (
    <nav>
      <div id="header">
          <Link className="color" id="main-icon" to="/">
          <GiShoppingBag/>
          ShopMonk
          </Link>

        <ul className="list">
          <Link className={`list-item color hover-item ${path.pathname === "/"? 'active':``}`} to="/">
            <li>Home</li>
          </Link>
          <Link className={`list-item color hover-item ${path.pathname === "/category"? 'active':``}`} to="/category">
            <li>Category</li>
          </Link>
          {/* <Link className={`list-item color hover-item ${path.pathname === "/about"? 'active':``}`} to="/about">
            <li>About</li>
          </Link>
          <Link className={`list-item color hover-item ${path.pathname === "/contact"? 'active':``}`} to="/contact">
            <li>Contact</li>
          </Link> */}
          <Link className={`list-item color hover-item ${path.pathname === "/login"? 'active':``}`} to="/login">
            <li>Login</li>
          </Link>
          <Link className={`list-item color hover-item ${path.pathname === "/signup"? 'active':``}`} to="/signup">
            <li>Signup</li>
          </Link>
          <Link className={`list-item color hover-item ${path.pathname === "/cart"? 'active':``}`} to="/cart">
            <li>Cart {0}</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
