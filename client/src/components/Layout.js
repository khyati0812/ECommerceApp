// src/components/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <Header>
        <h1>Header</h1>
        {/* Include navigation or other header elements here */}
      </Header>
      <main>
        {children} {/* This is where the page content will be rendered */}
      </main>
      <Footer>
        <p>Footer</p>
        {/* Include footer content here */}
      </Footer>
    </div>
  );
};

export default Layout;
