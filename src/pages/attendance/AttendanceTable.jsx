import React from "react";
import { Table } from "antd";
import { createStyles } from "antd-style"
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    fixed: "left",
  },

  {
    title: "1",
    dataIndex: "address",
    key: "1",
    fixed: "left",
  },
  {
    title: "2",
    dataIndex: "address",
    key: "2",
  },
  {
    title: "3",
    dataIndex: "address",
    key: "3",
  },
  {
    title: "4",
    dataIndex: "address",
    key: "4",
  },
  {
    title: "5",
    dataIndex: "address",
    key: "5",
  },
  {
    title: "6",
    dataIndex: "address",
    key: "6",
  },
  {
    title: "7",
    dataIndex: "address",
    key: "7",
  },
  {
    title: "8",
    dataIndex: "address",
    key: "8",
  },
  {
    title: "9",
    dataIndex: "address",
    key: "9",
  },
  {
    title: "10",
    dataIndex: "address",
    key: "10",
  },
  {
    title: "11",
    dataIndex: "address",
    key: "11",
  },
  {
    title: "12",
    dataIndex: "address",
    key: "12",
  },
  {
    title: "13",
    dataIndex: "address",
    key: "13",
  },
  {
    title: "14",
    dataIndex: "address",
    key: "14",
  },
  {
    title: "15",
    dataIndex: "address",
    key: "15",
  },
  {
    title: "16",
    dataIndex: "address",
    key: "16",
  },
  {
    title: "17",
    dataIndex: "address",
    key: "17",
  },
  {
    title: "18",
    dataIndex: "address",
    key: "18",
  },
  {
    title: "19",
    dataIndex: "address",
    key: "19",
  },
  {
    title: "20",
    dataIndex: "address",
    key: "20",
  },
];
const dataSource = [
  {
    key: "1",
    name: "Olivia",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Ethan",
    age: 40,
    address: "London Park",
  },
];
const AttendanceTable = () => {
  const { styles } = useStyle();
  return (
    <Table
      bordered
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: "max-content",
      }}
      pagination={false}
    />
  );
};
export default AttendanceTable;
