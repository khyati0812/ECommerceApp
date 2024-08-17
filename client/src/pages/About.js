import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css"; // Import the custom CSS

const AboutUs = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">About Us</h1>
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h2>The Bodyrock Way</h2>
              <p>
                At Bodyrock Bootcamp, we specialize in fun and effective
                back-to-basics core fitness training. We don't believe in
                gimmicks or trends. Our goal is to help you unlock your full
                potential and achieve the best version of yourself.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoLlE4qUhzJyKPSRjIJB9boSA-T2k_T9rdw&s"
            alt="Bodyrock Way"
            className="img-fluid mb-4 rounded"
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={{ span: 5, order: 2 }} className="offset-md-1">
          <Card className="mb-4">
            <Card.Body>
              <h2>Our Method</h2>
              <p>
                Our method focuses on strengthening your core, enhancing
                flexibility, and improving overall health. We believe in simple,
                effective, and results-driven workouts that are accessible to
                everyone.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 5, order: 1 }} className="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ779AFmqD11YLOAScWZ5DkU27RcTX_eIOyrA&s"
            alt="Our Method"
            className="img-fluid mb-4 rounded image-adjustment"
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide access to quality health and fitness
                for all. We strive to create a supportive community where
                everyone can thrive and achieve their goals, regardless of their
                background or experience level.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUc9BLm_w-PmczhmdkvajjqfwdQ26bkV-zhA&s"
            alt="Our Mission"
            className="img-fluid mb-4 rounded"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
