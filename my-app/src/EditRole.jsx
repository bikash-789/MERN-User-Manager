import React, { useState, useEffect } from "react";
import { getRole, updateRole } from "./api";
import { useParams } from "react-router-dom";

function EditRole() {
  const [values, setValues] = useState({
    name: "",
    permission: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { roleId } = useParams();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const roleData = await getRole(roleId);
        setValues({
          name: roleData.name || "",
        });
      } catch (err) {
        console.error("Error fetching role:", err);
        setError("Failed to fetch role details.");
      }
    };
    fetchRole();
  }, [roleId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = values;
    if (!name) {
      setError("Name and permissions cannot be empty.");
      return;
    }
    try {
      setLoading(true);
      await updateRole(roleId, {
        name,
      });
      alert("Role updated successfully");
    } catch (err) {
      console.error("Error updating role:", err);
      setError("Failed to update role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Edit Role</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Role Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="border-2 border-gray-300 p-2 mt-1 w-full"
            placeholder="Enter role name"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Role"}
        </button>
      </form>
    </div>
  );
}

export default EditRole;
