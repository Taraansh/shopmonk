import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        { headers: { Authorization: auth } }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      getOrders();
    }
    //eslint-disable-next-line
  }, [auth]);

  return (
    <Layout title="My Orders - ShopMonk">
      <div style={{ display: "flex", margin: "1rem" }}>
        <div>
          <UserMenu />
        </div>
        <div className="user-content" style={{ textAlign: "center" }}>
          <h1>All Orders</h1>

          <div>
            {orders?.map((order, index) => {
              return (
                <div>
                  <table id="orders" key={index}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payemnt?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      margin: "0",
                    }}
                  >
                    {order?.products.map((product) => (
                      <div
                        key={product._id}
                        style={{
                          border: "2px solid black",
                          borderRadius: "5px",
                          margin: "1rem",
                        }}
                      >
                        <div></div>
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
                              width: "auto",
                              margin: "2px auto",
                            }}
                            onClick={() => {
                              navigate(`/product/${product.slug}`);
                            }}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
