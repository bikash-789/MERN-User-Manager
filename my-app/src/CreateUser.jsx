import React, { useState, useEffect } from "react";
import { createUser, getRoles } from "./api";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleData = await getRoles();
        setRoles(roleData);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Failed to fetch roles.");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name, password, role } = values;

    if (!email || !name || !password || !role) {
      setError("Email, Name, Password, and Role cannot be empty");
      return;
    }

    try {
      await createUser(values);
      navigate("/users");
    } catch (err) {
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create New User
      </h1>
      <form
        className="bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
