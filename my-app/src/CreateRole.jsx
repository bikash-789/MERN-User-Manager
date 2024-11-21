import React, { useState } from "react";
import { createRole } from "./api";
import { useNavigate } from "react-router-dom";

function CreateRole() {
  const [values, setValues] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = values;
    if (!name) {
      setError("Role name cannot be empty.");
      return;
    }
    try {
      await createRole(values);
      navigate("/roles");
    } catch (err) {
      setError("Failed to create role. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create New Role
      </h1>
      <form
        className="bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="roleName"
            className="block text-sm font-medium text-gray-700"
          >
            Role Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter role name"
            className="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Create Role
        </button>
      </form>
    </div>
  );
}

export default CreateRole;
