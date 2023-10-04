import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        console.log(data);
        setCategories(data.category);
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

  //update category name
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };

  //delete category 
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div style={{ display: "flex", margin: "1rem 0" }}>
        <div>
          <AdminMenu />
        </div>
        <div id="create-category-content" className="admin-content">
          <h1 style={{ textAlign: "center" }}>Manage Category</h1>
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              buttonName='Add'
            />
          </div>
          <table id="category">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td style={{ display: "flex" }}>
                    <button
                      className="button-login-signup"
                      style={{
                        width: "3rem",
                        margin: "1px 4px",
                        padding: "4px 8px",
                      }}
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(category.name);
                        setSelected(category);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="button-login-signup"
                      style={{
                        width: "4.5rem",
                        margin: "1px 4px",
                        padding: "4px 8px",
                        backgroundColor: "#bc1111",
                      }}
                      onClick={()=>{handleDelete(category._id)}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            onCancel={() => {
              setVisible(false);
            }}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              buttonName="Update"
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
