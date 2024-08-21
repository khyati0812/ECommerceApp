import React from 'react';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react";
import './Header.css'; // Custom CSS for styling
import { useAuth } from '../context/auth';
const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    // Remove auth from localStorage
    localStorage.removeItem('auth');
    // Set auth to null to re-render the component
    setAuth({...auth,user:null,token:""});
  };
  return (
    <Navbar bg="light" expand="lg" className="mb-4 navbar">
      <Container>
        <Navbar.Brand className="brand">
          <img 
            src="https://w7.pngwing.com/pngs/384/470/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo.png" 
            alt="ECommerce Icon" 
            className='ecommerce-icon'
          />
          ECommerce App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/category" className="nav-link">Category</Nav.Link>
            {auth && auth.user ? (
        <Nav.Link onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>Logout</Nav.Link>
      ) : (
        <>
          <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
          <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
        </>
      )}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="nav-link">
              <i className="bi bi-cart"></i> Cart <Badge bg="secondary">0</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
