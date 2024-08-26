import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <h4 className="mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Item className="mb-2">
          <Nav.Link as={Link} to="/admin/create-category" className="menu-item">
            <i className="bi bi-folder-plus"></i> Create Category
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link as={Link} to="/admin/create-product" className="menu-item">
            <i className="bi bi-box-seam"></i> Create Product
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Nav.Link as={Link} to="/admin/users" className="menu-item">
            <i className="bi bi-people"></i> Users
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminMenu;
