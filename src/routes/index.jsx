import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import AuthProvider from "../hooks/AuthProvider";
import LayoutWrapper from "../layout";
import {
  Attendance,
  Error,
  Hodimlar,
  Statistika,
  TayyorMaxsulotlar,
} from "../pages";
import Magazinlar from "../pages/magazin";
import Ombor from "../pages/ombor";
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
    element: (
      <AuthProvider>
        <PrivateRoute />
      </AuthProvider>
    ),
    children: [
      {
        path: "/statistics",
        element: (
          <LayoutWrapper>
            <Statistika />
          </LayoutWrapper>
        ),
      },
      {
        path: "categories",
        element: (
          <LayoutWrapper>
            <Ombor />
          </LayoutWrapper>
        ),
      },
      {
        path: "shops",
        element: (
          <LayoutWrapper>
            <Magazinlar />
          </LayoutWrapper>
        ),
      },
      {
        path: "employees",
        element: (
          <LayoutWrapper>
            <Hodimlar />
          </LayoutWrapper>
        ),
      },
      {
        path: "employees/attendance",
        element: (
          <LayoutWrapper>
            <Attendance />
          </LayoutWrapper>
        ),
      },
      {
        path: "ready-product",
        element: (
          <LayoutWrapper>
            <TayyorMaxsulotlar />
          </LayoutWrapper>
        ),
      },
      {
        path: "*",
        element: (
          <LayoutWrapper>
            <Error />
          </LayoutWrapper>
        ),
      },
    ],
  },
]);

export default routes;
