import React from "react";
import Layout from "../../components/Layouts/Layout.jsx";
import UserMenu from "../../components/Layouts/UserMenu.jsx";
import { useAuth } from "../../context/auth.js";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Flower Shop"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user.name}</h3>
              <h3>{auth?.user.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
