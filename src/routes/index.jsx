import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
