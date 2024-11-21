import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignupPage = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert("User created successfully");
        history.push("/login");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Role</option>
              <option value="role1">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:bg-gray-300 transition duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <Link to="/login" className="underline pt-2 text-center">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;