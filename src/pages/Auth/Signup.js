import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, answer, password, phone, address }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Layout title="Signup - ShopMonk">
        <h1 className="main">ShopMonk</h1>
        <div className="sign-in">
          <div id="sign_in_form">
            <form onSubmit={handleSubmit}>
              <h2 className="secondary">Sign Up</h2>
              <hr className="horizontal-line" />
              <p>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  name="name"
                  placeholder="Enter Name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="input"
                  name="email"
                  placeholder="Enter your Email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="input"
                  name="phone"
                  placeholder="Enter your Phone No."
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="address" className="label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input"
                  name="address"
                  placeholder="Enter your Address"
                  required
                  autoComplete="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="answer" className="label">
                  Name of the city where you were born.
                </label>
                <input
                  type="text"
                  id="answer"
                  className="input"
                  name="answer"
                  placeholder="Name of the city where you were born"
                  required
                  autoComplete="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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
                Sign Up
              </button>
            </form>
            <p className="link-to-login-signup">
              Already Have an Account?
              <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
