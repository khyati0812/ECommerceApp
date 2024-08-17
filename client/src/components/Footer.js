import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} ECommerce App. All rights reserved.</p>
            <div className="footer-links">
              <a href="/about" className="footer-link">About</a>
              <a href="/policy" className="footer-link">Policy</a>
              <a href="/contact" className="footer-link">Contact</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
