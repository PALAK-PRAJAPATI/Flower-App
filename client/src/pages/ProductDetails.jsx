import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get product.
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container m-2 d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top "
            alt={product.name}
            style={{ height: "350px", width: "400px", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6 ">
          <h1
            className="text-center"
            style={{
              borderBottom: "1px solid black",
              textTransform: "uppercase",
              color: "#34495E",
            }}
          >
            Product details
          </h1>
          <p>
            Name : <b>{product.name}</b>
          </p>
          <p>
            Description : <b>{product.description}</b>
          </p>
          <p>
            Price : <b>{product.price}</b>
          </p>
          {/* <p>
            Category : <b>{product.category.slug}</b>
          </p> */}
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      {/* {JSON.stringify(product, null, 4)} */}
    </Layout>
  );
};

export default ProductDetails;
