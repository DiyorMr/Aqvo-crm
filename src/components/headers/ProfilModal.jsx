import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
const ProfilModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onFinish = (values) => {
    console.log("Form values:", values);
    setOpen(false);
  };
  return (
    <>
      <UserOutlined
        onClick={showLoading}
        className="cursor-pointer bg-[#00000040] size-8 p-2 text-white rounded-2xl"
      />

      <Modal
        title={<h1>Parol va Telefon Raqamini Yangilash</h1>}
        footer={false}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Yangi Ism"
            name="firstName"
            rules={[{ required: true, message: "Yangi ismingizni kiriting!" }]}
          >
            <Input placeholder="Yangi ismingizni kiriting" />
          </Form.Item>
          <Form.Item
            label="Yangi Telefon raqam"
            name="phone"
            rules={[
              { required: true, message: "Yangi telefon raqamizni kiriting!" },
            ]}
          >
            <Input placeholder="Yangi Telefon raqamizni kiriting" />
          </Form.Item>
          <Form.Item
            label="Yangi Parol"
            name="password"
            rules={[{ required: true, message: "Yangi parolni kiriting" }]}
          >
            <Input placeholder="Yangi parolni kiriting" />
          </Form.Item>
          <div>
            <div class="ant-modal-footer">
              <Button type="button" className="border-b-blue-400">
                <span>Bekor qilish</span>
              </Button>
              <Button htmlType="submit" type="primary">
                <span>Saqlash</span>
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ProfilModal;
