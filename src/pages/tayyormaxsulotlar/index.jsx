// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table } from 'antd';
// import { Button, Form, Input, Modal } from "antd"
// import { responsiveArray } from "antd/es/_util/responsiveObserver";

// const TayyorMaxsulotlar = () => {
//   const [conserveTypes, setConserveTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const accToken = localStorage.getItem("accToken");
//       if (!accToken) {
//         setError("Token topilmadi! Iltimos, tizimga qayta kiring.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get("https://aqvo.limsa.uz/api/conserve-type", {
//         headers: { Authorization: `Bearer ${accToken}` },
//       });

//       console.log(response.data)
//       if (response.data && Array.isArray(response.data.data)) {
//         const formattedData = response.data.data.map((item, index) => ({
//           key: item.id,
//           id: item.id,
//           no: index + 1,
//           nomi: item.conserveType,
//           miqdori: item.quantity,
//         }));
//         setConserveTypes(formattedData);
//       } else {
//         setError("Kutilmagan API javobi");
//       }
//     } catch (error) {
//       setError("Ma'lumotlarni olishda xatolik yuz berdi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //  Modalni ochish (Yangi yoki Edit)
//   const showModal = (record = null) => {
//     setSelectedItem(record);
//     setModalOpen(true);
//     form.setFieldsValue(record ? { nomi: record.nomi, miqdori: record.miqdori } : { nomi: "", miqdori: "" });
//   };

//   //  Delete modalni ochish
//   const showDeleteModal = (record) => {
//     setSelectedItem(record);
//     setDeleteOpen(true);
//   };

//   //  Modalni yopish
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedItem(null);
//     form.resetFields();
//   };

//   //  Delete modalni yopish
//   const closeDeleteModal = () => {
//     setDeleteOpen(false);
//     setSelectedItem(null);
//   };

//   // Mahsulot qo‘shish yoki tahrirlash
//   const onFinish = async (values) => {
//     try {
//       const accToken = localStorage.getItem("accToken");
//       const config = { headers: { Authorization: `Bearer ${accToken}` } };

//       if (selectedItem) {
//         //  Agar mahsulot tahrirlanayotgan bo'lsa
//         await axios.put(`https://aqvo.limsa.uz/api/conserve-type/${selectedItem.id}`, values, config);
//         message.success("Mahsulot muvaffaqiyatli yangilandi!");
//       } else {
//         // Yangi mahsulot qo‘shish
//         await axios.post("https://aqvo.limsa.uz/api/conserve-type", values, config);
//         message.success("Mahsulot muvaffaqiyatli qo‘shildi!");
//       }

//       closeModal();
//       fetchData(); // Jadvalni yangilash
//     } catch (error) {
//       message.error("Amal bajarishda xatolik yuz berdi!");
//     }
//   };

//   //  O‘chirishni tasdiqlash
//   const confirmDelete = async () => {
//     try {
//       const accToken = localStorage.getItem("accToken");
//       await axios.delete(`https://aqvo.limsa.uz/api/conserve-type/${selectedItem.id}`, {
//         headers: { Authorization: `Bearer ${accToken}` },
//       });

//       message.success("Mahsulot muvaffaqiyatli o‘chirildi!");
//       closeDeleteModal();
//       fetchData(); // Jadvalni yangilash
//     } catch (error) {
//       message.error("O‘chirishda xatolik yuz berdi!");
//     }
//   };

//   const columns = [
//     { title: 'No', dataIndex: 'no', key: 'no' },
//     { title: 'Nomi', dataIndex: 'nomi', key: 'nomi' },
//     { title: 'Miqdori', dataIndex: 'miqdori', key: 'miqdori' },
//     {
//       title: 'Amallar',
//       key: 'actions',
//       render: (_, record) => (
//         <div className="flex items-center gap-4">
//           {/*  Edit tugmasi */}
//           <svg
//             onClick={() => showModal(record)}
//             viewBox="64 64 896 896"
//             color="green"
//             width="1em"
//             height="1em"
//             style={{ cursor: "pointer", marginRight: 10 }}
//             fill="currentColor"
//           >
//             <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
//           </svg>

//           {/*  Delete tugmasi */}
//           <svg
//             onClick={() => showDeleteModal(record)}
//             viewBox="64 64 896 896"
//             color="red"
//             width="1em"
//             height="1.5em"
//             style={{ cursor: "pointer" }}
//             fill="currentColor"
//           >
//             <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
//           </svg>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-5">
//         <h1>Tayyor mahsulotlar</h1>
//         <Button type="primary" onClick={() => showModal()}>Tayyor mahsulot qo‘shish</Button>
//       </div>
//       <Table dataSource={conserveTypes} columns={columns} />

//       {/*  Tahrirlash / Yangi qo‘shish Modal */}
//       <Modal title={selectedItem ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish"} open={modalOpen} onCancel={closeModal} footer={null}>
//         <Form form={form} layout="vertical" onFinish={onFinish}>
//           <Form.Item name="nomi" label="Mahsulot nomi" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">Saqlash</Button>
//         </Form>
//       </Modal>

//       {/*  O‘chirishni tasdiqlash Modal */}
//       <Modal title="Rostdan ham o‘chirmoqchimisiz?" open={deleteOpen} onOk={confirmDelete} onCancel={closeDeleteModal}>
//         <p>{selectedItem?.nomi} mahsuloti o‘chiriladi.</p>
//       </Modal>
//     </div>
//   );
// };


// export default TayyorMaxsulotlar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TayyorMaxsulotlar = () => {
  const [conserveTypes, setConserveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const accToken = localStorage.getItem("accToken");
      if (!accToken) {
        message.error("Token topilmadi! Iltimos, tizimga qayta kiring.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://aqvo.limsa.uz/api/conserve-type", {
        headers: { Authorization: `Bearer ${accToken}` },
      });
      console.log(response.data)
      if (response.data && Array.isArray(response.data.data)) {
        const formattedData = response.data.data.map((item, index) => ({
          key: item.id,
          id: item.id,
          no: index + 1,
          nomi: item.conserveType,
        }));
        setConserveTypes(formattedData);
      } else {
        message.error("Kutilmagan API javobi");
      }
    } catch (error) {
      message.error("Ma'lumotlarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (record = null) => {
    setSelectedItem(record);
    setModalOpen(true);
    form.setFieldsValue(record ? { nomi: record.nomi, miqdori: record.miqdori } : { nomi: "", miqdori: "" });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const handleEdit = async (values) => {
    try {
      const accToken = localStorage.getItem("accToken");
      const config = { headers: { Authorization: `Bearer ${accToken}` } };

      if (selectedItem) {
        await axios.put(`https://aqvo.limsa.uz/api/conserve-type/${selectedItem.id}`, values, config);
        message.success("Mahsulot muvaffaqiyatli yangilandi!");
      } else {
        await axios.post("https://aqvo.limsa.uz/api/conserve-type", values, config);
        message.success("Mahsulot muvaffaqiyatli qo‘shildi!");
      }

      closeModal();
      fetchData();
    } catch (error) {
      message.error("Amal bajarishda xatolik yuz berdi!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const accToken = localStorage.getItem("accToken");
      await axios.delete(`https://aqvo.limsa.uz/api/conserve-type/${id}`, {
        headers: { Authorization: `Bearer ${accToken}` },
      });

      message.success("Mahsulot muvaffaqiyatli o‘chirildi!");
      fetchData();
    } catch (error) {
      message.error("O‘chirishda xatolik yuz berdi!");
    }
  };

  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Nomi', dataIndex: 'nomi', key: 'nomi' },
    { title: 'Miqdori', dataIndex: 'miqdori', key: 'miqdori' },
    {
      title: 'Amallar',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center gap-4 text-green-700">
          <EditOutlined
            className="cursor-pointer"
            onClick={() => showModal(record)}
          />
          <div className="text-red-600">
          <Popconfirm
            title="Rostdan ham ushbu mahsulotni o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined className="cursor-pointe text-red-600" />
          </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>Tayyor mahsulotlar</h1>
        <Button type="primary" onClick={() => showModal()}>
          Tayyor mahsulot qo‘shish
        </Button>
      </div>
      <Table dataSource={conserveTypes} columns={columns} loading={loading} />

      <Modal
        title={selectedItem ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish"}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item name="nomi" label="Mahsulot nomi" rules={[{ required: true }]}>
            <Input placeholder="Mahsulot nomi, masalan: Tushonka" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TayyorMaxsulotlar;