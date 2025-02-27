import LayoutWrapper from "../layout";
// import { Attendance, Hodimlar, Magazin, Ombor, Statistika, TayyorMaxsulotlar } from "../pages";
import Tayyor1 from "../pages/tayyormaxsulotlar/Tayyor1";
import { Attendance, Hodimlar, Magazin, MagazinDetail, Ombor, Statistika, TayyorMaxsulotlar } from "../pages";
import MaxsulotTarixi from "../pages/tayyormaxsulotlar/MaxsulotTarixi";

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
  {
    path: "tayyor1/:id",
    element: (
      <LayoutWrapper>
        <Tayyor1 />
      </LayoutWrapper>
    ),
  },
  {
    path: "maxsulottarixi",
    element: (
      <LayoutWrapper>
        <MaxsulotTarixi />
      </LayoutWrapper>
    ),
  },
];
