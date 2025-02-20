import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Employees, Error, FinishedProducts, Statistics, Stores, Warehouse } from "../pages";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Statistics />,
        },
        {
          path: "warehouse",
          element: <Warehouse />,
        },
        {
          path: "stores",
          element: <Stores />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "finished-products",
          element: <FinishedProducts />,
        },       
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);
  
  export default routes;