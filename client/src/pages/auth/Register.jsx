import React, { useState } from "react";
import "../../style/authStyle.css";
import Layout from "../../components/Layouts/Layout.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  // navigate.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        { name, email, password, phone, address, answer }
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
    <Layout title={"Register - Flower Shop"}>
      <div className="form-container" style={{ minHeight: "75vh" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="title">register form</h3>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              className="form-control"
              id="exampleInputPhone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your Favorite Sports"
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
