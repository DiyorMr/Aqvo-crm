import React from "react";
import { Button, Modal, Switch } from "antd";
const EmployeesModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <Button type="primary" onClick={showLoading}>
        Open Modal
      </Button>
      <Modal
        title={<h1>Hodim ma'lumotlari</h1>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Saqlash
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Ism:</p>
        <p>Familiya:</p>
        <p>Telefon:</p>
        <p>Oylik daromad:</p>
        <p>Lavozimi:</p>
        <p>Ish boshlangan vaqti:</p>
        <div className="flex gap-2">
          <p>Kelganmi:</p>
          <Switch />
        </div>
      </Modal>
    </>
  );
};
export default EmployeesModal;
