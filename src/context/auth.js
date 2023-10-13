import React, { useState, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [details, setDetails] = useState(null);
  const [user, setUser] = useState(() =>
    localStorage.getItem("token") ? true : false
  );

  const [auth, setAuth] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const navigate = useNavigate();
  const location = useLocation();

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  const handleLogIn = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        setAuth(res.data.token);
        setUser(true);
        setDetails(res.data.user);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleResetPassword = async (e, email, answer, newPassword) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, answer, newPassword }
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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(false);
    setAuth(null);
    navigate("/login");
    toast.success("User Logged out Successfully.");
  };

  const value = {
    user: user,
    details: details,
    auth: auth,
    handleLogIn: handleLogIn,
    handleLogout: handleLogout,
    setDetails: setDetails,
    handleResetPassword: handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
