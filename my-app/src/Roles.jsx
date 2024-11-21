import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRole, getRoles } from "./api";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRoles();
        setRoles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Failed to fetch roles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setLoading(true);
      try {
        await deleteRole(roleId);
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role._id !== roleId)
        );
        alert("Role deleted successfully");
      } catch (error) {
        console.error("Error deleting role:", error);
        setError("Failed to delete role.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Roles</h1>
      <hr className="mb-4" />
      <div className="text-center mb-4">
        <Link
          to="/create/role"
          className="text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Create Role
        </Link>
      </div>
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : roles.length === 0 ? (
        <p className="text-center text-gray-500">No roles available</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((el) => (
              <tr key={el._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{el.name}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/role/update/${el._id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Roles;
