import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, buttonName }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span style={{display: 'flex', margin: '10px 0'}}>
          <input
            type="text"
            style={{ width: "50%", margin: "0 2rem 0" }}
            className="input"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            type="submit"
            className="button-login-signup"
            style={{ width: "5rem",height: '2.5rem', margin: "0 0 0 0"}}
          >
            {buttonName}
          </button>
        </span>
      </form>
    </div>
  );
};

export default CategoryForm;
