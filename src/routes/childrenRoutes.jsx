import LayoutWrapper from "../layout";
import {
  Attendance,
  Hodimlar,
  Magazin,
  MagazinDetail,
  MagazinHistory,
  Ombor,
  Statistika,
  TayyorMaxsulotlar,
} from "../pages";
import MaxsulotTarixi from "../pages/tayyormaxsulotlar/MaxsulotTarixi";
import Tayyor1 from "../pages/tayyormaxsulotlar/Tayyor1";

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
    path: "shops/:id/history",
    element: (
      <LayoutWrapper>
        <MagazinHistory />
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
