import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";

export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/user-auth"
        // if we don't passed header Authorization specifically then we have mention it globally in Context/auth file.
        // we globally added in Context/auth file(line-13) that is why we can not mentioned it here.
        // {
        //   headers: {
        //     Authorization: auth?.token,
        //   },
        // }
      );
      if (response.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    // if we got the token auth function called.
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};
