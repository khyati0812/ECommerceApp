// src/components/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css"
import { Helmet } from "react-helmet";

const Layout = ({ children,title }) => {
  return (
    <div className="layout">
    <Helmet>
        <title>{title}</title>
        <meta name="description" content="This is a description of my page for SEO purposes." />
      </Helmet>
      <Header >
        <h1>Header</h1>
        {/* Include navigation or other header elements here */}
      </Header>
      <main className="content">
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
