import { CalendarOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { defaultModalData } from "./constants";

const EmployeesAddModal = ({
  modalData,
  setModalData,
  open,
  setOpen,
  loading,
  getList
}) => {
  const token = localStorage.getItem("accToken");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const onFinish = (values) => {
    var values = modalData.id
      ? {
          ...values,
          startedWorkingAt: dayjs(values.startedWorkingAt).format("YYYY-MM-DD"),
        }
      : values;

    modalData.id
      ? axios
          .put(`https://aqvo.limsa.uz/api/users/${modalData.id}`, values, headers)
          .then((res) => res.data.statusCode===200&&toast.success("Muvaffaqiyatli o'zgartirildi!"))
          .catch((err) => toast.error(err.response.data.message))
          .finally(()=>getList())
      :  axios
          .post(`https://aqvo.limsa.uz/api/auth/employee/sign-up`, values, headers)
          .then((res) => res.data.statusCode===200&&toast.success("Muvaffaqiyatli yaratildi!"))
          .catch((err) => toast.error(err.response.data.message))
          .finally(()=>getList())
    setOpen(false);
    setModalData(defaultModalData);
  };

  const closeModal = () => {
    setModalData(defaultModalData);
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div>
      <Modal
        title={<h1>Hodim qo'shish</h1>}
        footer={false}
        loading={loading}
        open={open}
        onCancel={() => closeModal()}
        centered
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...modalData,
            salary:parseInt(modalData.salary),
            startedWorkingAt: dayjs(modalData.startedWorkingAt, "YYYY-MM-DD"),
          }}
        >
          <Form.Item
            label="Ism"
            name="firstName"
            rules={[{ required: true, message: "Ismni kiriting!" }]}
          >
            <Input placeholder="Hodim ismini kiriting" />
          </Form.Item>
          <Form.Item
            label="Familiya"
            name="lastName"
            rules={[{ required: true, message: "Familiyani kiriting!" }]}
          >
            <Input placeholder="Hodim familiyasini kiriting" />
          </Form.Item>
          <Form.Item
            label="Telefon raqami"
            name="phoneNumber"
            rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
          >
            <Input placeholder="99 999 99 99" />
          </Form.Item>
          <Form.Item
            label="Lavozim"
            name="position"
            rules={[{ required: true, message: "Lavozimini kiriting!" }]}
          >
            <Input placeholder="Lavozimini kiriting" />
          </Form.Item>
          <Form.Item
            label="Oylik"
            name="salary"
            rules={[{ required: true, message: "Oylikni kiriting!" }]}
          >
            <InputNumber style={{width:"100%"}} placeholder="Oylikni kiriting" />
          </Form.Item>
          <Form.Item
            label="Ish boshlanish sanasi"
            name="startedWorkingAt"
            rules={[{ required: true, message: "Sanani tanlang!" }]}
          >
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              placeholder="ДД.ММ.ГГГГ"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {modalData.id ? "O'zgartirish" : "Qo'shish"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesAddModal;
