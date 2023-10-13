import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth) authCheck();
  }, [auth]);

  return ok ? <Outlet /> : <Spinner path="/" />;
}
