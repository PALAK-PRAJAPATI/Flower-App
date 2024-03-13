import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout.jsx";
import UserMenu from "../../components/Layouts/UserMenu.jsx";
import { useAuth } from "../../context/auth.js";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  // context.
  const [auth, setAuth] = useAuth();
  // state.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth/profile",
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error, { position: "top-center" });
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong...", { position: "top-center" });
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-containe" style={{ minHeight: "75vh" }}>
              <form onSubmit={handleSubmit}>
                <h3
                  className="title text-center"
                  style={{
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    color: "#34495E",
                  }}
                >
                  user profile
                </h3>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    className="form-control"
                    id="exampleInputName"
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
                    disabled
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
                  />
                </div>
                <div className="text-center ">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ textTransform: "uppercase" }}
                  >
                    update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
