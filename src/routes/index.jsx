import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import AuthProvider from "../hooks/AuthProvider";
import { Error } from "../pages";
import { childrenRoutes } from "./childrenRoutes";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: "/",
    children: childrenRoutes,
    element: (
      <AuthProvider>
        <PrivateRoute />
      </AuthProvider>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default routes;
