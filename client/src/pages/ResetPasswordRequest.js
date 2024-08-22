import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        toast.success("Password reset email sent!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();

        // Redirect to a confirmation or information page
        navigate("/reset-email-sent");
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error || "Something went wrong");
        toast.error(result.error || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-form-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Reset Password</h2>
        {submissionStatus && (
          <Alert
            variant={submissionStatus === "success" ? "success" : "danger"}
          >
            {submissionStatus === "success"
              ? "Password reset email sent!"
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

          <Button variant="primary" type="submit" className="w-100">
            Send Reset Link
          </Button>
        </Form>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default ResetPasswordRequest;
