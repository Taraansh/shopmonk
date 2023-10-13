import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import { AuthContext } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { CartContext } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const path = useLocation();
  const { user, details, handleLogout } = useContext(AuthContext);
  const categories = useCategory();
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <div id="header">
        <Link className="color" id="main-icon" to="/">
          ShopMonk
        </Link>

        <SearchInput />

        <ul className="list">
          <div className="dropdown">
            <span className="dropbtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
            <div className="dropdown-content">
              <Link
                className={`list-item color hover-item ${
                  path.pathname === "/" ? "active" : ``
                }`}
                to="/"
              >
                <li>Home</li>
              </Link>
              <div className="login-dropdown">
                <span className="login-dropbtn list-item color hover-item">
                  <Link
                    className="list-item color"
                    style={{ margin: "0" }}
                    to={"/categories"}
                  >
                    Categories
                  </Link>
                </span>
                <div className="login-dropdown-content">
                  {categories.map((category) => (
                    <Link
                      to={`/category/${category.slug}`}
                      key={category._id}
                      className="list-item color"
                    >
                      <li style={{ width: "10rem" }}>{category.name}</li>
                    </Link>
                  ))}
                </div>
              </div>

              {user ? (
                <>
                  <div className="login-dropdown">
                    <span className="login-dropbtn list-item color hover-item">
                      {details?.name
                        ? details.name
                        : localStorage.getItem("name")}
                    </span>
                    <div className="login-dropdown-content">
                      <Link
                        className={`list-item color ${
                          path.pathname === "/dashboard" ? "active" : ``
                        }`}
                        to={`/dashboard/${
                          details?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        <li>Dashboard</li>
                      </Link>
                      <Link
                        onClick={handleLogout}
                        className={`list-item color ${
                          path.pathname === "/login" ? "active" : ``
                        }`}
                        to="/login"
                      >
                        <li>Logout</li>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className={`list-item color hover-item ${
                      path.pathname === "/login" ? "active" : ``
                    }`}
                    to="/login"
                  >
                    <li>Login</li>
                  </Link>
                  <Link
                    className={`list-item color hover-item ${
                      path.pathname === "/signup" ? "active" : ``
                    }`}
                    to="/signup"
                  >
                    <li>Signup</li>
                  </Link>
                </>
              )}
              <Badge className={`list-item`} count={cart?.length}>
                <Link className={`color`} to="/cart">
                  <li style={{ fontSize: "20px" }}>&#128722;</li>
                </Link>
              </Badge>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
