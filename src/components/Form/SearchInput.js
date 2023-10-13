import React, { useContext } from "react";
import { SearchContext } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { search, setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  //search function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${search.keyword}`
      );
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span style={{ display: "flex", margin: "0" }}>
          <input
            type="text"
            style={{ width: "30rem", margin: "0 1rem 0" }}
            className="input"
            placeholder="Enter new Category"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          />

          <button
            type="submit"
            className="button-login-signup"
            style={{
              margin: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
            }}
          >
            Search
          </button>
        </span>
      </form>
    </div>
  );
};

export default SearchInput;
