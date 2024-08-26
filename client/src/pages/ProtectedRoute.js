import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ requiredRole }) => {
  const [auth] = useAuth();
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log("Auth state:", auth); // Check the auth state
    console.log("User role:", auth?.user?.role); // Check the user role
    console.log("Required role for route:", requiredRole); // Verify required role for the route
  }, [auth, requiredRole]);

  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!auth?.user) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [auth]);

  if (!auth?.user) {
    if (redirect) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
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

  // If user role doesn't match the required role, redirect to not-found
  if (auth?.user?.role !== requiredRole) {
    return <Navigate to="/not-found" />;
  }

  // If authenticated and role matches, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
