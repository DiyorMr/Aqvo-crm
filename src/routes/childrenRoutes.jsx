import LayoutWrapper from "../layout";
import { Attendance, Hodimlar, Magazin, MagazinDetail, Ombor, Statistika, TayyorMaxsulotlar } from "../pages";

export const childrenRoutes = [
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
        <Magazin />
      </LayoutWrapper>
    ),
  },
  {
    path: "shops/:id",
    element: (
      <LayoutWrapper>
        <MagazinDetail />
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
];
