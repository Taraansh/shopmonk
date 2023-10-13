import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { CartContext } from "../context/cart";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const { auth, details } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`,
        { headers: { Authorization: auth } }
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    //eslint-disable-next-line
  }, [auth]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart },
        { headers: { Authorization: auth } }
      );
      if (data?.success) {
        toast.success("Order Placed Successfully");
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate(`/dashboard/user/orders`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ margin: "0.5rem 1rem" }}>
        <h1 style={{ textAlign: "center" }}>{`Hello ${
          details?.name ? details?.name : ""
        }`}</h1>
        <h4 style={{ textAlign: "center" }}>
          {cart?.length > 0
            ? `You have ${cart.length} items in your cart. ${
                auth ? "" : "Please Login to checkout"
              }`
            : "Your Cart is empty"}
        </h4>
        <div style={{ display: "flex" }}>
          {cart?.length >= 1 && (
            <div
              style={{
                width: "70%",
                border: "2px solid black",
                margin: "1rem 1rem 1rem 0.5rem",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  margin: "0",
                }}
              >
                {cart?.map((product) => (
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
                          removeCartItem(product._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            style={{
              width: "32%",
              border: "2px solid black",
              margin: "1rem 0.5rem 1rem 0.5rem",
              display: "block",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Cart Summary</h2>
            <p style={{ textAlign: "center" }}>Total | Check out | Payment</p>
            <hr style={{ width: "80%", margin: "0.5rem auto" }} />
            <div style={{ marginLeft: "3rem" }}>
              <h4>Total : {totalPrice()}</h4>
              {details?.address ? (
                <>
                  <div style={{ margin: "1rem 0" }}>
                    <h3>Current Address:</h3>
                    <h4>{details?.address}</h4>
                    <button
                      className="button-login-signup"
                      style={{ width: "auto" }}
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ margin: "1rem 0" }}>
                    {auth ? (
                      <button
                        onClick={() => {
                          navigate("/dashboard/user/profile");
                        }}
                        className="button-login-signup"
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/login", { state: "/cart" });
                        }}
                        className="button-login-signup"
                        style={{ width: "auto" }}
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  type="button"
                  className="button-login-signup"
                  style={{ width: "auto" }}
                  onClick={handlePayment}
                  disabled={loading || !instance || !details?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
