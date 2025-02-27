import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TayyorMaxsulotlar = () => {
  const [conserveTypes, setConserveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const accToken = localStorage.getItem("accToken");
      if (!accToken) {
        toast.error("Token topilmadi! Iltimos, tizimga qayta kiring.");
        setLoading(false);
        return;
      }
      const response = await axios.get("https://aqvo.limsa.uz/api/conserve-type", {
        headers: { Authorization: `Bearer ${accToken}` },
      });
      console.log("API javobi:", response.data); // API ma'lumotlarni ko‘ramiz

      if (response.data && Array.isArray(response.data.data)) {
        const formattedData = response.data.data.map((item, index) => ({
          key: item.id || index, // Xatolikni oldini olish uchun
          id: item.id || null, // Ba’zan ID kelmasligi mumkin
          no: index + 1,
          nomi: item.conserveType || "Noma'lum",
          miqdori: index * 2
        }));
        setConserveTypes(formattedData);
      } else {
        toast.error("Kutilmagan API javobi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Ma'lumotlarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };
  const showModal = (record = null) => {
    console.log("Modal ochildi, record:", record); //  Konsolga chiqaramiz
    setSelectedItem(record);
    setModalOpen(true);
    if (record) {
      form.setFieldsValue({
        nomi: record.nomi || "",
        miqdori: record.miqdori || "",
      });
    } else {
      form.resetFields();
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    form.resetFields();
  };
  const handleEdit = async (values) => {
    try {
      const accToken = localStorage.getItem("accToken");
      if (!accToken) {
        toast.error("Token topilmadi! Iltimos, tizimga qayta kiring.");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${accToken}` } };
      const payload = {
        conserveType: values.nomi, // API ga to‘g‘ri maydon nomi yuboriladi
      };
      if (selectedItem && selectedItem.id) {
        //  Tahrirlash (PUT so‘rov)
        console.log("PUT so‘rov:", `https://aqvo.limsa.uz/api/conserve-type/${selectedItem.id}`, payload);
        await axios.put(`https://aqvo.limsa.uz/api/conserve-type/${selectedItem.id}`, payload, config);
        toast.success("Mahsulot muvaffaqiyatli yangilandi!");
      } else {
        //  Yangi mahsulot qo‘shish (POST so‘rov)
        console.log("POST so‘rov:", "https://aqvo.limsa.uz/api/conserve-type", payload);
        await axios.post("https://aqvo.limsa.uz/api/conserve-type", payload, config);
        toast.success("Mahsulot muvaffaqiyatli qo‘shildi!");
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
      toast.error("Amal bajarishda xatolik yuz berdi!");
    }
  };
  const handleDelete = async (id) => {
    try {
      if (!id) {
        toast.error("Xatolik: ID topilmadi!");
        return;
      }
      const accToken = localStorage.getItem("accToken");
      if (!accToken) {
        toast.error("Token topilmadi! Iltimos, tizimga qayta kiring.");
        return;
      }
      await axios.delete(`https://aqvo.limsa.uz/api/conserve-type/${id}`, {
        headers: { Authorization: `Bearer ${accToken}` },
      });
      toast.success("Mahsulot muvaffaqiyatli o‘chirildi!"); // `toastify` orqali xabar
      fetchData();
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
      toast.error("O‘chirishda xatolik yuz berdi!");
    }
  };
  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Nomi', dataIndex: 'nomi', key: 'nomi' },
    { title: 'Miqdori', dataIndex: 'miqdori', key: 'miqdori' },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_, record) => {
        return (
          <div className="flex items-center gap-4 text-green-700">
            <EditOutlined
              className="cursor-pointer"
              onClick={() => {
                if (record.id) {
                  showModal(record);
                } else {
                  toast.error("Xatolik: ID topilmadi!");
                }
              }}
            />
            <div className="text-red-600">
              <Popconfirm
                title="Rostdan ham ushbu mahsulotni o'chirmoqchimisiz?"
                onConfirm={() => {
                  if (record.id) {
                    handleDelete(record.id);
                  } else {
                    toast.error("Xatolik: ID topilmadi!");
                  }
                }}
              >
                <DeleteOutlined className="cursor-pointer text-red-600" />
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-between mb-5">
        <h1>Tayyor mahsulotlar</h1>
        <Button type="primary" onClick={() => showModal()}>
          Tayyor mahsulot qo‘shish
        </Button>
      </div>
      <Table dataSource={conserveTypes} columns={columns} loading={loading} onRow={(record) => ({
        onClick: () => navigate(`/tayyor1/${record.id}`, { state: record }),
      })} />

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