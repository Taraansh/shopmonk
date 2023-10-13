import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving products");
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="All Products - ShopMonk">
      <div style={{ display: "flex", margin: "1rem 0" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="manage-product-content" className="admin-content">
          <h1 style={{ textAlign: "center" }}>All Products</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              margin: "0 1rem",
            }}
          >
            {products.map((product) => (
              <Link
                key={product._id}
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/dashboard/admin/product/${product.slug}`}
              >
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "5px",
                    margin: "1rem",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    width={"240px"}
                    height={"240px"}
                  />
                  <hr />
                  <div>
                    <h5>{product.name}</h5>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
