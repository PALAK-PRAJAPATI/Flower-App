import React, { useState } from "react";
import "../../style/authStyle.css";
import Layout from "../../components/Layouts/Layout.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // createContext auth.
  const [auth, setAuth] = useAuth();

  // navigate.
  const navigate = useNavigate();
  // URL location.
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message, { position: "top-center" });
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        // data store in local storage.
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong...", { position: "top-center" });
    }
  };

  return (
    <Layout title={"Register - Flower Shop"}>
      <div className="form-container" style={{ minHeight: "75vh" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="title">login form</h3>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            login
          </button>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              forgot-password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
