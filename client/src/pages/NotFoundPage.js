import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // Custom CSS for styling

const NotFoundPage = () => {
  return (
    <Container fluid className="not-found-page">
      <Row className="justify-content-center align-items-center min-vh-100 text-center">
        <Col md={8}>
          <img
            src="https://agentestudio.com/uploads/post/image/69/main_how_to_design_404_page.png"
            alt="404 Not Found"
            className="img-fluid"
          />
          <h1 className="mt-4">Oops! Page Not Found</h1>
          <p>
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link to="/">
            <Button variant="primary">Go Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
