import React from "react";
import Layout from "../components/Layouts/Layout.jsx";

const About = () => {
  return (
    <Layout title={"About us-Flower Shop"}>
      <div className="row about-us m-2">
        <div className="col-md-6">
          <img
            src="/images/flower-shop.jpg"
            alt="about-us"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-4 about-content">
          <h1 className="text-center bg-dark text-white mt-2">ABOUT US</h1>
          <ul className="mt-2">
            <li>Fresh Flower Delivery</li>
            <li>Local Florist Delivery</li>
            <li>High-style Floral Arrangements</li>
            <li>Contemporary & Traditional Arrangements</li>
            <li>Weddings and Special Events</li>
            <li>Funeral and Sympathy Flowers</li>
            <li>Gift Baskets, Soft Toys, Balloons</li>
            <li>Flowers and Balloons Delivery</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
