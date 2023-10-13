import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  //get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`,
        { headers: { Authorization: auth } }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      getAllOrders();
    }
    //eslint-disable-next-line
  }, [auth]);

  //handle status change
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value },
        { headers: { Authorization: auth } }
      );
      if (data?.success) {
        getAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Dashboard - Manage Orders">
      <div style={{ display: "flex", margin: "1rem 0" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="create-category-content" className="admin-content">
          <h1 style={{ textAlign: "center" }}>Manage Orders</h1>
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(order._id, value)}
                          defaultValue={order?.status}
                        >
                          {status.map((status, index) => (
                            <Option key={index} value={status}>
                              {status}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payemnt?.success ? "Success" : "Failed"}</td>
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
    </Layout>
  );
};

export default AdminOrders;
