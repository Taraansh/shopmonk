import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <div id="body-container">
          <Header />
          <main id="main-body">
            <Toaster />
            {children}
          </main>
          {/* <main style={{ minHeight: "100vh" }}>{children}</main> */}
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
};

Layout.defaultProps = {
  title: "ShopMonk",
  description: "Concentrate on Shopping like a monk",
  keywords: "Shopping, Buy, Products, Clothes, Mobile, Laptops",
  author: "Taraansh",
};

export default Layout;
