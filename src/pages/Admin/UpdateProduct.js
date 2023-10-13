import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data?.product.name);
      setId(data?.product._id);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setCategory(data?.product.category);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting product");
    }
  };

  useEffect(
    () => {
      getSingleProduct();
    }, // eslint-disable-next-line
    []
  );

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
    // eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category._id);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting product");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div style={{ display: "flex", margin: "1rem 0" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="create-product-content" className="admin-content">
          <h1 style={{ textAlign: "center" }}>Update Product</h1>
          <form onSubmit={handleUpdate}>
            <div style={{ width: "90%", margin: "auto" }}>
              <Select
                style={{ width: "100%", marginLeft: "0px" }}
                placeholder="Select a category"
                size="large"
                showSearch
                className="input"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((category) => {
                  return (
                    <Option id={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
              <div>
                <label
                  className="button-login-signup"
                  style={{ marginLeft: "0rem" }}
                >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div>
                {photo ? (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      height="200px"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="Product"
                      height="200px"
                    />
                  </div>
                )}
              </div>
              <div>
                <input
                  className="input"
                  style={{ marginLeft: "0", width: "100%" }}
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <textarea
                  className="input"
                  style={{ marginLeft: "0", width: "100%" }}
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  className="input"
                  style={{ marginLeft: "0", width: "100%" }}
                  type="number"
                  value={price}
                  placeholder="Write Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  className="input"
                  style={{ marginLeft: "0", width: "100%" }}
                  type="number"
                  value={quantity}
                  placeholder="Write quantity"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div style={{}}>
                <Select
                  className="input"
                  style={{ width: "100%", marginLeft: "0" }}
                  placeholder="Select Shipping"
                  size="large"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div style={{ marginTop: "8px" }}>
                <button
                  type="submit"
                  style={{ margin: "8px 0", width: "10rem" }}
                  className="button-login-signup"
                >
                  Update Product
                </button>
              </div>
              <div style={{ marginTop: "8px" }}>
                <button
                  type="button"
                  className="button-login-signup"
                  style={{ margin: "8px 0", width: "10rem" }}
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
