import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Users from "./Users";
import Roles from "./Roles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/create/role",
    element: <CreateRole />,
  },
  {
    path: "/create/user",
    element: <CreateUser />,
  },
  {
    path: "/user/update/:userId",
    element: <UpdateUser />,
  },
  {
    path: "/role/update/:roleId",
    element: <EditRole />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
