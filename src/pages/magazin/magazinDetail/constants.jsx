import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export const ColumnsDetailed = [
  {
    title: "№",
    dataIndex: "nomer",
    key: "nomer",
  },
  {
    title: "Mahsulot nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Soni",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Narxi(so'm)",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Qabul qilingan to'lov(so'm)",
    dataIndex: "totalDebt",
    key: "totalDebt",
  },
  {
    title: "Jami(so'm)",
    dataIndex: "allTotalPrices",
    key: "allTotalPrices",
  },
  {
    title: "Topshirilgan Vaqti",
    dataIndex: "lastUpdateAt",
    key: "lastUpdateAt",
  },
];
