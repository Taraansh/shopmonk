import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogIn } = useContext(AuthContext);

  return (
    <>
      <Layout title="Login - ShopMonk">
        <h1 className="main">ShopMonk</h1>
        <div className="log-in">
          <div id="log_in_form">
            <form
              onSubmit={(e) => {
                handleLogIn(e, email, password);
              }}
            >
              <h2 className="secondary">Log In</h2>
              <hr className="horizontal-line" />
              <p>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <button type="submit" className="button-login-signup">
                Log In
              </button>
            </form>
            <p className="link-to-login-signup">
              Don't have an account?
              <Link to="/signup">Log In</Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
