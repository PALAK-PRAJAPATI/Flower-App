import React from "react";
import Layout from "./Layouts/Layout.jsx";
import { useSearch } from "../context/search.js";

const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <Layout title={"Search Result"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {value?.results.length < 1
              ? "No Product Found"
              : `Found ${value?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap gap-2 m-4">
            {value?.results.map((p) => (
              <div className="card  p-2" style={{ width: "19rem" }}>
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
