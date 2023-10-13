import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  //initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div style={{ display: "flex", margin: "1rem" }}>
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product?.name}
            width={"240px"}
            height={"240px"}
          />
        </div>
        <div style={{ width: "70%" }}>
          <h1 style={{ textAlign: "center" }}>Product Details</h1>
          <div style={{ marginLeft: "10rem" }}>
            <h4>Name: {product.name}</h4>
            <h4>Description: {product.description}</h4>
            <h4>Price: {product.price}</h4>
            <h4>Category: {product?.category?.name}</h4>
            <button
              type="button"
              className="button-login-signup"
              style={{
                width: "auto",
                margin: "0",
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr style={{ width: "90%", color: "grey", margin: "auto" }} />
        <div>
          <h1 style={{ textAlign: "center", margin: "0.5rem 0 0 0" }}>
            Similar Products
          </h1>
          {relatedProducts.length < 1 && (
            <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
              No Similar Products Found
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0",
            }}
          >
            {relatedProducts?.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  margin: "1rem",
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  to={`/product/${product.slug}`}
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
                    <p>{product.description.substring(0, 30)}...</p>
                    <p>${product.price}</p>
                  </div>
                </Link>
                <div style={{ display: "flex" }}>
                  <button
                    type="button"
                    className="button-login-signup"
                    style={{
                      width: "54%",
                      margin: "1px",
                    }}
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    type="button"
                    className="button-login-signup"
                    style={{
                      width: "50%",
                      margin: "1px",
                    }}
                  >
                    Add to cart
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

export default ProductDetails;
