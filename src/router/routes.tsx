import { createBrowserRouter } from "react-router-dom";

import { ErrorPage, LoginPage, HomePage } from "@/pages";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
