import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LINK_PATHS } from "../utils/constant";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import { PrivateRoute } from "./PrivateRoutes";

function RouterPath() {
  const router = createBrowserRouter([
    {
      element: <SignIn />,
      path: LINK_PATHS.signin.path,
    },
    {
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      path: LINK_PATHS.dashboard.path,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterPath;
