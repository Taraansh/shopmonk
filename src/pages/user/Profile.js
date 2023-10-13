import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  //context
  const { auth, details, setDetails } = useContext(AuthContext);
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    setName(details?.name);
    setEmail(details?.email);
    setPhone(details?.phone);
    setAddress(details?.address);
  }, [details]);

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address },
        { headers: { Authorization: auth } }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Profile Updated SUccessfully");
        setDetails(data?.updatedUser);
        localStorage.setItem("name", data?.updatedUser?.name);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title="My Profile - ShopMonk">
      <div style={{ display: "flex", marginTop: "1rem", marginBottom: "1rem" }}>
        <div>
          <UserMenu />
        </div>
        <div className="user-content">
          <h1 style={{ textAlign: "center" }}>User Profile</h1>
          <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
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
                autoComplete="email"
                disabled
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
                autoComplete="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <button type="submit" className="button-login-signup">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
