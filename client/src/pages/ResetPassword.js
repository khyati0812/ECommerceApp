import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
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
      const response = await fetch(`http://localhost:8080/api/v1/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();

        // Redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Wait for 2 seconds before navigating
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
        <h2 className="text-center mb-4">Set New Password</h2>
        {submissionStatus && (
          <Alert
            variant={submissionStatus === "success" ? "success" : "danger"}
          >
            {submissionStatus === "success"
              ? "Password reset successfully!"
              : errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
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
            Reset Password
          </Button>
        </Form>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default ResetPassword;

