import React, { useState } from "react";
import "../../style/authStyle.css";
import Layout from "../../components/Layouts/Layout.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  // navigate.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        { email, newPassword, answer }
      );
      if (response.data.success) {
        toast.success(response.data.message, { position: "top-center" });

        navigate("/login");
      } else {
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong...", { position: "top-center" });
    }
  };
  return (
    <Layout>
      <div className="form-container" style={{ minHeight: "75vh" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="title">reset password</h3>

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
              type="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Your New Password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Your Sport"
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
