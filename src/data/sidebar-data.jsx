import {
  AppstoreAddOutlined,
  DesktopOutlined,
  MergeCellsOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const sidebarData = [
  {
    key: "/",
    icon: <DesktopOutlined />,
    label: "Statistics",
  },
  {
    key: "/warehouse",
    icon: <MergeCellsOutlined />,
    label: "Warehouse",
  },
  {
    key: "/stores",
    icon: <ShopOutlined />,
    label: "Stores",
  },
  {
    key: "/employees",
    icon: <UsergroupAddOutlined />,
    label: "Employees",
  },
  {
    key: "/finished-products",
    icon: <AppstoreAddOutlined />,
    label: "FinishedProducts",
  },
];
