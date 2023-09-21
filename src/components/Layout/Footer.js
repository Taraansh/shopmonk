import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <h4>All Rights Reserved &copy; Taraansh</h4>
      <p className="para-items">
        <Link className="hover-item color" to="/about">About Us</Link> |{" "}
        <Link className="hover-item color" to="/contact">Contact Us</Link> |{" "}
        <Link className="hover-item color" to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
