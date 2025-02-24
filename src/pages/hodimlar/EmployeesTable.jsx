import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons/lib/icons";
import EmployeesAddModal from "./EmployeesAddModal";
import { NavLink } from "react-router-dom";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const EmployeesTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "1",
      age: "32",
      phone: "London, Park Lane no. 0",
      monthly_income: 500000,
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "No",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Monthly income",
      dataIndex: "monthly_income",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Siz ushbu xodimni o'chirishga aminmisiz?"
            onConfirm={() => handleDelete(record.key)}
          >
            <EditOutlined className="cursor-pointer" />
            <DeleteOutlined className="pl-8 text-red-500 cursor-pointer" />
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: ` ${count}`,
      age: "32",
      phone: `London, Park Lane no. ${count}`,
      monthly_income: `London, Park ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-black text-xl">Employees</h1>
        <div className="flex gap-6">
          <Button className="mb-5" type="primary">
            <NavLink to="attendance">Davomatga o'tish</NavLink>
          </Button>
          <EmployeesAddModal />
        </div>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

export default EmployeesTable;
