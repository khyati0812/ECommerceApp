import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PolicyPage from "./pages/Policy"; // Adjust the path as needed
import ContactUsPage from "./pages/Contact"; // Adjust the path as needed
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/About";
import HomePageYoutube from "./pages/HomePageYoutube";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./context/auth";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import ResetEmailSent from "./pages/ResetEmailSent";
function App() {
  const [auth, setAuth] = useAuth();
  return (
    <Routes>
      <Route
        path="/policy"
        element={
          <Layout>
            <PolicyPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      <Route
        path="/"
        element={
          
            <HomePageYoutube />
        
        }
      />
       <Route path="/reset-email-sent" element={<ResetEmailSent />} />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactUsPage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
       <Route path="/request-reset" element={<ResetPasswordRequest />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;