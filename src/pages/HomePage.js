import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import { CartContext } from "../context/cart";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    // eslint-disable-next-line
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data?.success) {
        setLoading(false);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong while retrieving products");
    }
  };

  //filter by category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked, radio]);

  //get filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving products");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
    //eslint-disable-next-line
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div style={{ display: "flex", margin: "0.5rem 0" }}>
        <div
          style={{
            width: "20%",
            margin: "1rem 0.5rem 1rem 1rem",
          }}
        >
          <div style={{ border: "2px solid black" }}>
            <h4 style={{ textAlign: "center", margin: "4px 0 4px 0" }}>
              Filter by category
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "1rem",
              }}
            >
              {categories?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, category._id);
                  }}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <hr style={{ width: "80%", margin: "1rem auto 0.5rem" }} />
            {/* price filter */}
            <h4 style={{ textAlign: "center", margin: "4px 0 4px 0" }}>
              Filter by Price
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "1rem",
              }}
            >
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices?.map((price) => (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                className="button-login-signup"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: "2px solid black",
            margin: "1rem 1rem 1rem 0.5rem",
            display: "block",
          }}
        >
          <h1 style={{ textAlign: "center", margin: "0.5rem 0 0 0" }}>
            All Products
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0",
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
                    onClick={() => {
                      toast.success("Product Added to the Cart");
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      setCart([...cart, product]);
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
      <div>
        {products && products.length < total && (
          <button
            className="button-login-signup"
            style={{ width: "auto" }}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
