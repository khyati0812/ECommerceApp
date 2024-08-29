// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminMenu.css'; // For custom styles
import Layout from './Layout';
const AdminMenu = () => {
  return (
    <Layout>
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/create-category">Create Category</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/create-product">Create Product</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
      </Layout>
  );
};

export default AdminMenu;

