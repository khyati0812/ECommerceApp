import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShieldAlt, FaGavel, FaUndo, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PolicyPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Our Policies</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title><FaShieldAlt /> Privacy Policy</Card.Title>
              <Card.Text>
                Protecting customer data is our top priority. We ensure that all personal information is kept secure and confidential.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title><FaGavel /> Terms and Conditions</Card.Title>
              <Card.Text>
                Defining the rules of engagement for using our services. Please read these terms carefully before using our website.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title><FaUndo /> Refund Policy</Card.Title>
              <Card.Text>
                Setting clear expectations for refunds. Learn about our refund process and conditions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title><FaExclamationTriangle /> Disclaimer</Card.Title>
              <Card.Text>
                Mitigating liability risks. Understand the limitations of our liability regarding the use of our services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title><FaEnvelope /> Contact Us</Card.Title>
              <Card.Text>
                Establishing communication. Feel free to reach out to us with any questions or concerns.
                <br />
                <Link to="/contact" className="btn btn-primary mt-2">Go to Contact Us</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PolicyPage;
