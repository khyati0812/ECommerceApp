import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ResetEmailSent = () => {
  const navigate = useNavigate();

  return (
    <div className="login-form-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Check Your Email</h2>
        <Alert variant="info">
          If the email address exists in our system, you will receive a password reset link shortly. Please check your inbox.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Container>
    </div>
  );
};

export default ResetEmailSent;
