import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./api";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log("Fetched users:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Manage Users</h1>
      <hr className="mb-4" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Link
        to={`/create/user`}
        className="text-white bg-purple-600 py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-200 ease-in-out"
      >
        Create User
      </Link>
      {users.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role.name}</td>
                  <td className="py-3 px-6 flex space-x-3">
                    <Link
                      to={`/user/update/${user._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-center">No users found.</p>
      )}
    </div>
  );
}

export default Users;
