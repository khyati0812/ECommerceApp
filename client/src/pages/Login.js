import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import "./Login.css"; // Custom CSS for styling
import { useAuth } from "../context/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [auth, setAuth] = useAuth();
  const [submissionStatus, setSubmissionStatus] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const playErrorSound = () => {
    const audio = new Audio("error_sound.wav");
    audio.play();
  };

  const notifyError = (message) => {
    playErrorSound();
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response Status:", response.status); // Log status
      console.log("Response Data:", result); // Log response data

      if (response.ok) {
        setAuth({
          user: result.user,
          token: result.token,
        });
        setSubmissionStatus("success");
        setErrorMessage("");
        reset(); // Clear the form

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000); // Wait for 2 seconds before navigating
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error || "Invalid credentials");
        notifyError(result.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setSubmissionStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      notifyError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        {submissionStatus && (
          <Alert
            variant={submissionStatus === "success" ? "success" : "danger"}
          >
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

        {/* Toast Container for notifications */}
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
