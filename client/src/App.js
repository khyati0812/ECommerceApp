import React from "react";
import { Routes, Route } from "react-router-dom";
import PolicyPage from "./pages/Policy"; // Adjust the path as needed
import ContactUsPage from "./pages/Contact"; // Adjust the path as needed
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/About";
import HomePageYoutube from "./pages/HomePageYoutube";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./context/auth";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import ResetEmailSent from "./pages/ResetEmailSent";
import AdminMenu from "./components/AdminMenu";
import CreateCategory from "./pages/Admin/CreateCategory";

function App() {
  const [auth] = useAuth();

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
      <Route path="/" element={<AdminMenu />} />
      <Route element={<ProtectedRoute requiredRole={1} />}>
        <Route
          path="/create-category"
          element={
            <Layout>
              <CreateCategory />
            </Layout>
          }
        />
      </Route>
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

      {/* Role-based protected routes */}
      {/* Only users with role 0 (user) can access this */}
      <Route element={<ProtectedRoute requiredRole={1} />}>
        <Route
          path="/admin/dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
      </Route>

      {/* Protected route for User */}
      <Route element={<ProtectedRoute requiredRole={0} />}>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <UserDashboard />
            </Layout>
          }
        />
      </Route>

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
