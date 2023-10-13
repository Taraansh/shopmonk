import React, { useContext } from "react";
import Layout from "./../components/Layout/Layout";
import { SearchContext } from "../context/Search";
import { Link } from "react-router-dom";

const Search = () => {
    const {search} = useContext(SearchContext)

  return (
    <Layout title={"Search Results - ShopMonk"}>
      <div style={{ textAlign: "center" }}>
        <h1>Search Results</h1>
        <h5>
          {search?.results.length < 1
            ? "No Products Found"
            : `Found ${search?.results.length}`}
        </h5>
        <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0",
            }}
          >
            {search.results?.map((product) => (
              <Link
                key={product._id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
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
                    <p>{product.description.substring(0, 30)}...</p>
                    <p>${product.price}</p>
                    <div style={{ display: "flex" }}>
                      <button
                        type="submit"
                        className="button-login-signup"
                        style={{
                          width: "50%",
                          margin: "1px",
                        }}
                      >
                        Open
                      </button>
                      <button
                        type="submit"
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
                </div>
              </Link>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default Search;
