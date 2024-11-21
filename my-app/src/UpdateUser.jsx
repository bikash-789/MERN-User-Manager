import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, getUserById } from "./api";

function UpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setValues({
          name: userData.name || "",
          email: userData.email || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name } = values;

    if (!email || !name) {
      setError("Email and Name cannot be empty");
      return;
    }

    try {
      await updateUser(userId, values);
      navigate("/users");
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-xs justify-center items-center mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">Update User</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border-2 border-black px-2 mt-1 w-full"
          value={values.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-2 border-black px-2 mt-1 w-full"
          value={values.email}
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          className="bg-purple-600 px-2 py-1 rounded-md mt-2 text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
