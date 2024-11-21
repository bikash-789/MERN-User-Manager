import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">User manager</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/users" className="hover:underline">
                Users
              </Link>
            </li>
            <li>
              <Link to="/roles" className="hover:underline">
                Roles
              </Link>
            </li>
            <li>
              <Link to="/create/user" className="hover:underline">
                Create User
              </Link>
            </li>
            <li>
              <Link to="/create/role" className="hover:underline">
                Create Role
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
