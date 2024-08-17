import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Login.css"; // Custom CSS for styling

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmissionStatus("success");
        setErrorMessage("");
        reset(); // Clear the form

        // Store token in localStorage or sessionStorage
        localStorage.setItem("authToken", result.token);

        // Optionally, you can redirect the user after a successful login
        // window.location.href = "/dashboard";
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error || "Invalid credentials");
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="login-form">
      <h2 className="text-center mb-4">Login</h2>
      {submissionStatus && (
        <Alert variant={submissionStatus === "success" ? "success" : "danger"}>
          {submissionStatus === "success"
            ? "Login successful!"
            : errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
