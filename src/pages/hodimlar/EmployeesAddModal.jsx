import { CalendarOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import React from "react";

const EmployeesAddModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const onFinish = (values) => {
    console.log("Form values:", values);
    setOpen(false);
  };
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div>
      <Button type="primary" onClick={showLoading}>
        Yangi hodim qo'shish
      </Button>
      <Modal
        title={<h1>Hodim qo'shish</h1>}
        footer={false}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
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
            name="phone"
            rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
          >
            <Input placeholder="99 999 99 99" />
          </Form.Item>
          <Form.Item
            label="Lavozim"
            name="text"
            rules={[{ required: true, message: "Lavozimini kiriting!" }]}
          >
            <Input placeholder="Lavozimini kiriting" />
          </Form.Item>
          <Form.Item
            label="Oylik"
            name="oylik"
            rules={[{ required: true, message: "Oylikni kiriting!" }]}
          >
            <Input placeholder="Oylikni kiriting" />
          </Form.Item>
          <Form.Item
            label="Ish boshlanish sanasi"
            name="startDate"
            rules={[{ required: true, message: "Sanani tanlang!" }]}
          >
            <DatePicker
              className="w-full"
              format="DD.MM.YYYY"
              placeholder="ДД.ММ.ГГГГ"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Qo'shish
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesAddModal;
