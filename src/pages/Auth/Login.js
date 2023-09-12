import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          { email, password }
        );
        if(res.data.success){
          console.log(res.data)
          toast.success(res.data.message);
          navigate('/')
        }else{
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    };

  return (
    <>
      <Layout title="Login - ShopMonk">
        <h1 className="main">ShopMonk</h1>
        <div className="log-in">
          <div id="log_in_form">
            <form onSubmit={handleSubmit}>
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
                  onChange={(e)=>setEmail(e.target.value)}
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
                  onChange={(e)=>setPassword(e.target.value)}
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
