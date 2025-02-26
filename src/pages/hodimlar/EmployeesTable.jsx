import React, { Fragment, useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons/lib/icons";
import EmployeesAddModal from "./EmployeesAddModal";
import { NavLink } from "react-router-dom";
import { columns, defaultModalData } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import EmployeesModal from "./EmployeesModal";

const EmployeesTable = () => {
  const token = localStorage.getItem("accToken");
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const [dataSource, setDataSource] = useState([]);
  const [modalData, setModalData] = useState(defaultModalData);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get("https://aqvo.limsa.uz/api/users/employee", headers)
      .then((res) =>
        res.data.statusCode === 200
          ? setDataSource(
              res.data.data.map((item, index) => ({ ...item, key: index + 1 }))
            )
          : []
      )
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://aqvo.limsa.uz/api/users/${id}`, headers)
      .then(
        (res) =>
          res.data.statusCode === 200 &&
          toast.success("Muvaffaqiyatli o'chirildi!")
      )
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => getList());
  };

  const handleEdit = (record) => {
    setModalData(record);
    showLoading();
  };

  const showLoading = () => {
    setOpen(true);
    setLoadingModal(true);

    setTimeout(() => {
      setLoadingModal(false);
    }, 1000);
  };

  const actionColumn = {
    title: "Amallar",
    dataIndex: "id",
    align: "center",
    render: (id, record) =>
      dataSource.length >= 1 ? (
        <Fragment>
          <EditOutlined
            className="cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Siz ushbu xodimni o'chirishga aminmisiz?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined className="pl-8 text-red-500 cursor-pointer" />
          </Popconfirm>
        </Fragment>
      ) : null,
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-black text-xl">Hodimlar</h1>
        <div className="flex gap-6">
          <Button className="mb-5" type="primary">
            <NavLink to="attendance">Davomatga o'tish</NavLink>
          </Button>
          <Button type="primary" onClick={showLoading}>
            Yangi hodim qo'shish
          </Button>
          <EmployeesAddModal
            modalData={modalData}
            setModalData={setModalData}
            open={open}
            setOpen={setOpen}
            loading={loadingModal}
            getList={getList}
          />
        </div>
      </div>
      <Table
        className="cursor-pointer"
        bordered
        loading={loading}
        dataSource={dataSource}
        columns={[...columns, actionColumn]}
      />
      <EmployeesModal />
    </>
  );
};

export default EmployeesTable;
