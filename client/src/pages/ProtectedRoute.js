import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = () => {
  const [auth] = useAuth();
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!auth?.user) {
      // Set a timeout to change the state to trigger redirection
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 4000);
      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [auth]);

  if (!auth?.user) {
    if (redirect) {
      // Navigate to login after 4 seconds
      return <Navigate to="/login" state={{ from: location }} />;
    }
    // Show a spinner while waiting for redirection
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Redirecting...</span>
          </Spinner>
          <h5 className="mt-3">Redirecting to login...</h5>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
