import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container 
      className="my-5" 
      style={{ 
        border: '2px solid black', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-light">
            <Row noGutters>
              <Col md={6}>
                <Card.Img
                  src="https://www.sqprofessional.com/assets/images/contacts/contacts.png"
                  alt="Contact"
                  className="img-fluid"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <Card.Body>
                  <Card.Title>Contact Information</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> John Doe
                    <br />
                    <strong>Email:</strong> john.doe@example.com
                    <br />
                    <strong>Phone:</strong> +123 456 7890
                    <br />
                    <strong>Address:</strong> 123 Main Street, City, Country
                    <br />
                    <br />
                    <Button variant="primary" href="mailto:john.doe@example.com">Email Us</Button>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
