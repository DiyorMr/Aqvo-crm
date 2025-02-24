import {
  AppstoreAddOutlined,
  DesktopOutlined,
  MergeCellsOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const sidebarData = [
  {
    key: "/statistics",
    icon: <DesktopOutlined />,
    label: "Statistika",
  },
  {
    key: "/categories",
    icon: <MergeCellsOutlined />,
    label: "Ombor",
  },
  {
    key: "/shops",
    icon: <ShopOutlined />,
    label: "Magazinlar",
  },
  {
    key: "/employees",
    icon: <UsergroupAddOutlined />,
    label: "Hodimlar",
  },
  {
    key: "/ready-product",
    icon: <AppstoreAddOutlined />,
    label: "Tayyor maxsulotlar",
  },
];
