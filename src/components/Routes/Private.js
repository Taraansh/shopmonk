import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      if (res.data.ok) {
        console.log(res.data);
        console.log("abcd");
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth) authCheck();
  }, [auth]);

  return ok ? <Outlet /> : <Spinner />;
}
