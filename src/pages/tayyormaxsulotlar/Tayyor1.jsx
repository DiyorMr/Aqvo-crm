import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, Table, Select, Input, Form, DatePicker } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

function Tayyor1() {
    const location = useLocation();
    const navigate = useNavigate();
    const tayyor1 = location.state;

    if (!tayyor1) {
        return <h2 className="text-red-500 text-center mt-5">Mahsulot topilmadi!</h2>;
    }

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const [products, setProducts] = useState([]);

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Nomi", dataIndex: "nomi", key: "nomi" },
        { title: "Miqdori", dataIndex: "miqdori", key: "miqdori" },
        { title: "Kelgan vaqti", dataIndex: "kelgan_vaqti", key: "kelgan_vaqti" },
        { title: "Mahsulot biriktirilganmi?", dataIndex: "mahsulot_biriktirilganmi?", key: "mahsulot biriktirilganmi?" },
    ];

    const dataSource = [
        {
            key: "1",
            no: 1,
            nomi: tayyor1.nomi,
            miqdori: tayyor1.miqdori,
            kelgan_vaqti: tayyor1.data?.[0]?.productConsumptions?.[0]?.product?.lastUpdatedAt || "Hozircha yo'q",
        },
        ...products,
    ];

    const openConfirmModal = (values) => {
        setFormData(values);
        setIsAddProductModalOpen(false);
        setIsConfirmSaveModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmSaveModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h3 className="flex items-center gap-2 text-blue-500 cursor-pointer" onClick={() => navigate("/ready-product")}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" strokeWidth="2" d="M2,12 L22,12 M13,3 L22,12 L13,21" transform="matrix(-1 0 0 1 24 0)"></path>
                    </svg>
                    Tayyor maxsulotlar
                </h3>

                <div className="flex gap-4">
                    <Button type="primary" onClick={() => navigate(`/maxsulottarixi`)}>Maxsulot tarixini ko'rish</Button>
                    <Button type="primary" onClick={() => setIsConfirmModalOpen(true)}>Maxsulot tayyorlashda qo‘shiladigan mahsulotlar</Button>
                    <Button type="primary" onClick={() => setIsAddProductModalOpen(true)}>Mahsulot qo'shish</Button>
                </div>
            </div>

            {/* Mahsulotlar jadvali */}
            <Table dataSource={dataSource} columns={columns} />

            {/* 1-Modal: Tasdiqlash */}
            <Modal
                title="Tasdiqlash"
                open={isConfirmModalOpen}
                onCancel={() => setIsConfirmModalOpen(false)}
                footer={[
                    <Button key="no" onClick={() => setIsConfirmModalOpen(false)}>Bekor qilish</Button>,
                    <Button key="yes" type="primary" onClick={() => { setIsConfirmModalOpen(false); setIsEditModalOpen(true); }}>Ha</Button>,
                ]}
            >
                <p>Bu mahsulotni tayyorlashda foydalanilgan mahsulotlar mavjud. Davom ettirishdan oldin o‘chirishingiz zarur va boshidan qo‘shasiz?</p>
            </Modal>

            {/* 2-Modal: Mahsulot qo‘shish */}
            <Modal
                title="Mahsulot qo'shish"
                open={isAddProductModalOpen}
                onCancel={() => setIsAddProductModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={openConfirmModal}>
                    <Form.Item label="Mahsulot miqdori" rules={[{ required: true, message: "Miqdorni kiriting!" }]}>
                        <Input type="number" placeholder="Masalan, 200" />
                    </Form.Item>

                    <Form.Item label="Mahsulot keltirilgan sana" rules={[{ required: true, message: "Sanani tanlang!" }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block className="mt-3">
                        Saqlash
                    </Button>
                </Form>
            </Modal>

            {/* 3-Modal: Tasdiqlash modal */}
            <Modal
                title="Tasdiqlash"
                open={isConfirmSaveModalOpen}
                onCancel={closeConfirmModal}
                footer={[
                    <Button key="cancel" onClick={closeConfirmModal}>Bekor qilish</Button>,
                    <Button key="save" type="primary" onClick={closeConfirmModal}>Ha, saqlash</Button>,
                ]}
            >
                <p>Formadagi ma'lumotlarni saqlashga ishonchingiz komilmi?</p>
                {formData && (
                    <>
                        <p><strong>Miqdori:</strong> {formData.amount}</p>
                        <p><strong>Sana:</strong> {formData.date?.format("YYYY-MM-DD")}</p>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default Tayyor1;

