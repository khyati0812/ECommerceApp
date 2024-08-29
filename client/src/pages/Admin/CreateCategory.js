// src/components/CreateCategory.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [auth] = useAuth();
  useEffect(() => {
    // Fetch all categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/category/get-all-category"
        );
        const data = await response.json();
        if (response.ok) {
          setCategories(data.findCategory);
        } else {
          setError("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
      try {
          console.log(auth);
      const token = auth?.token; // Retrieve the existing token
      console.log("tken on frontend", token);
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/category/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ name }),
        }
      );

      console.log(response.headers);
      // Retrieve the new token from the response headers
      const newToken = response.headers.get("Authorization1");
      if (newToken) {
        localStorage.setItem("authToken", newToken.split(" ")[1]); // Store the new token in localStorage
      }

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(data.message);
        setCategories([...categories, data.category]);
        setName(""); // Clear the input field after successful creation
      } else {
        setError(data.message || "Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category.");
    }
  };

  const handleEdit = (id) => {
    // Logic for editing a category (this would navigate to an edit page or inline edit)
  };

  const handleDelete = async (id) => {
      try {
          const token = auth?.token;
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/category/delete-category/${id}`,
        {
          method: "DELETE",headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          }
        }
      );

      if (response.ok) {
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        setError("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category.");
    }
  };

  return (
    <div>
      <h2>Manage Category</h2>

      {/* Form to create a new category */}
      <Form onSubmit={handleCreateCategory}>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Create Category
        </Button>
      </Form>

      {/* Display message or error */}
      {message && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Table to display categories */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(category._id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CreateCategory;
