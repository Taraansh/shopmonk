import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories - ShopMonk"}>
      <div
        style={{
          margin: "1rem",
          border: "1px solid grey",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0.5rem 0" }}>
          All Categories
        </h1>
        <div style={{ margin: "1rem" }}>
          {categories.map((category) => (
            <button key={category._id}
              className="button-login-signup"
              style={{ width: "auto", marginLeft: "0" }}
            >
              <Link className="color" to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
