import React, { useState } from "react";
import { Button, Modal, Switch } from "antd";
import { postData } from "../../server/common";
import { toast } from "react-toastify";
const EmployeesModal = ({
  openEmModal,
  setOpenEmModal,
  attedanceModalData,
  getList,
}) => {
  console.log(attedanceModalData);
  const [isCame, setIsCame] = useState(false);

  const attedanceRequest = () => {
    var data = {
      isCame: isCame,
      userId: attedanceModalData.id,
    };
    postData("attendance", data)
      .then(
        (res) =>
          res.status === 201 && (getList(), toast.success("Davomat bajarildi!"))
      )
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => (setOpenEmModal(false), setIsCame(false)));
  };
  return (
    <>
      <Modal
        title={<h1>Hodim ma'lumotlari</h1>}
        loading={false}
        open={openEmModal}
        onCancel={() => setOpenEmModal(false)}
        footer={
          <Button type="primary" onClick={() => attedanceRequest()}>
            Saqlash
          </Button>
        }
      >
        <p>Ism:{attedanceModalData.firstName}</p>
        <p>Familiya:{attedanceModalData.lastName}</p>
        <p>Telefon:{attedanceModalData.phoneNumber}</p>
        <p>Oylik daromad:{attedanceModalData.salary}</p>
        <p>Lavozimi:{attedanceModalData.role}</p>
        <p>Ish boshlangan vaqti:{attedanceModalData.startedWorkingAt}</p>
        <div className="flex gap-2">
          <p>Kelganmi:</p>
          <Switch value={isCame} onClick={(e) => setIsCame(e)} />
        </div>
      </Modal>
    </>
  );
};
export default EmployeesModal;
