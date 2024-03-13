import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setCategory(data?.category);
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductByCategory();
  });
  return (
    <Layout>
      <div className="container mt-3">
        <h4
          className="text-center"
          style={{
            textDecoration: "Underline",
            textTransform: "Uppercase",
            color: "#34495E",
          }}
        >
          Category - {category.name}
        </h4>
        <div className="d-flex flex-wrap gap-2 ">
          {product?.map((p) => (
            <div className="card  p-2" style={{ width: "19rem" }} key={p._id}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top "
                alt={p.name}
                style={{ height: "250px", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{p.name}</h5>
                <p className="card-text text-center">{p.description}...</p>
                <p className="card-text text-center">₹{p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
