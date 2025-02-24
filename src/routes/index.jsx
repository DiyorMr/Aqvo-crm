import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import {
  Attendance,
  Error,
  Hodimlar,
  Statistika,
  TayyorMaxsulotlar,
} from "../pages";
import Magazinlar from "../pages/magazin";
import Ombor from "../pages/ombor";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Statistika />,
      },
      {
        path: "categories",
        element: <Ombor />,
      },
      {
        path: "shops",
        element: <Magazinlar />,
      },
      {
        path: "employees",
        element: <Hodimlar />,
      },
      {
        path: "employees/attendance",
        element: <Attendance />,
      },
      {
        path: "ready-product",
        element: <TayyorMaxsulotlar />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default routes;
