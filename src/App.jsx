import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Order from "./pages/Order";
import { WixClientContext } from "./context/WixContext";
import { useContext } from "react";

export default function App() {
  const { wixClient } = useContext(WixClientContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:slug",
          element: <Product />,
        },
        {
          path: "/products/:cat",
          element: <Products />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/profile",
          element: wixClient?.auth?.loggedIn() ? (
            <Profile />
          ) : (
            <Navigate to={"/auth"} />
          ),
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/orders/:id",
          element: wixClient?.auth?.loggedIn() ? (
            <Order />
          ) : (
            <Navigate to={"/auth"} />
          ),
        },
        {
          path: "/auth",
          element: <Login />,
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);
  return <RouterProvider router={router} />;
}
