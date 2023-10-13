import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  //get products by category
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCategory();
    //eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout titlt={``}>
      <div style={{ margin: "1rem", textAlign: "center" }}>
        <h1>Category - {category?.name}</h1>
        <h4>{products?.length} results found</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <hr style={{ width: "90%", color: "grey", margin: "auto" }} />

          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products?.map((product) => (
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

export default CategoryProduct;
