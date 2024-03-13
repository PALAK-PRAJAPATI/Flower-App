import React from "react";
import Layout from "../components/Layouts/Layout.jsx";
import { BiMailSend } from "react-icons/bi";
import { FcPhone } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";

const Contact = () => {
  return (
    <Layout title={"Contact us-Flower Shop"}>
      <div className="row contact-us m-2">
        <div className="col-md-6">
          <img
            src="/images/contact.jpg"
            alt="contact-us"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="text-center bg-dark text-white p-2 mt-2">
            CONTACT US
          </h1>
          <p className="text-justify mt-2" style={{ color: "cornflowerblue" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            voluptatem.
          </p>
          <p className="mt-3">
            <BiMailSend size={30} style={{ color: "blue" }} />{" "}
            <span className="contact-span">: www.flower@gmail.com</span>
          </p>
          <p className="mt-3">
            <FcPhone size={30} />{" "}
            <span className="contact-span">: 0987654321</span>
          </p>
          <p className="mt-3">
            <FcCustomerSupport size={30} />
            <span className="contact-span">: 1800-0000-0000 (toll free)</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
