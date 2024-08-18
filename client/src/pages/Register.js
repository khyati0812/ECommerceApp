import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import "./Register.css"; // Custom CSS for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = React.useState("");
  const navigate = useNavigate(); // Create a navigate instance

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
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSubmissionStatus("success");
        reset(); // Clear the form
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000); // Delay for 2 seconds before redirecting
      } else {
        setSubmissionStatus(result.error);
        notifyError(result.error);
      }
    } catch (error) {
      setSubmissionStatus("An error occurred");
      notifyError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="registration-form-container">
      <Container className="registration-form">
        <div className="form-and-image">
          <div className="form-section">
            <h2 className="text-center mb-4">Register</h2>
            {submissionStatus && (
              <Alert
                variant={submissionStatus === "success" ? "success" : "danger"}
              >
                {submissionStatus === "success"
                  ? "Registration successful!"
                  : submissionStatus}
              </Alert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phone", { required: "Phone number is required" })}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  {...register("address", { required: "Address is required" })}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your role (default: 0)"
                  {...register("role")}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </div>
          <div className="image-section">
            <img
              src="https://w7.pngwing.com/pngs/334/169/png-transparent-dora-the-explorer-dora-the-explorer-animated-cartoon-cartoon-character-miscellaneous-child-room.png"
              alt="Cartoon pointing"
              className="pointing-image"
            />
          </div>
        </div>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Register;

