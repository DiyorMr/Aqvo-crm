import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Table, Typography } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;
const { Option } = Select;
axios.defaults.baseURL = 'https://aqvo.limsa.uz/api/';
const Ombor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/categories');
      // Ensure we always have an array, even if API returns null/undefined
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error('Error fetching data');
      console.error('Failed to fetch categories:', error);
      // Set empty array in case of error
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      category: record.nomi,
      unit: record.olchov_turi,
      amount: record.miqdori
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingId) {
        // Handle edit logic
        await axios.put(`/categories/${editingId}`, {
          category: values.category,
          unit: values.unit
        });
        toast.success('Category updated successfully');
      } else {
        // Handle add logic
        await axios.post('/categories', {
          category: values.category,
          unit: values.unit
        });
        toast.success('Category added successfully');
      }
      
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      toast.error('Error saving data');
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Error deleting data');
      console.error('Delete failed:', error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: 'Nomi',
      dataIndex: 'nomi',
      key: 'nomi',
    },
    {
      title: 'Miqdori',
      dataIndex: 'miqdori',
      key: 'miqdori',
    },
    {
      title: "O'lchov turi",
      dataIndex: 'olchov_turi',
      key: 'olchov_turi',
    },
    {
      title: 'Amallar',
      key: 'amallar',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: 'green' }} />} 
            onClick={() => showEditModal(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined style={{ color: 'red' }} />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Ombor</Title>
        
        <div className="flex space-x-4">
          <Input.Search
            placeholder="Kategoriya qidirish"
            style={{ width: 250 }}
            onSearch={(value) => console.log(value)}
          />
          <Button 
            type="primary" 
            onClick={showAddModal}
            icon={<PlusOutlined />}
          >
            Kategoriya qo'shish
          </Button>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={data || []} // Ensure we always have an array
        rowKey={(record) => record.id || Math.random()} // Ensure we always have a unique key
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
      
      <Modal
        title={editingId ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo'shish"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingId ? "Saqlash" : "Qo'shish"}
        cancelText="Bekor qilish"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="category"
            label="Kategoriya nomi"
            rules={[{ required: true, message: "Kategoriya nomini kiriting!" }]}
          >
            <Input placeholder="Kategoriya nomi" />
          </Form.Item>
          
          <Form.Item
            name="unit"
            label="O'lchov turi"
            rules={[{ required: true, message: "O'lchov turini tanlang!" }]}
          >
            <Select placeholder="O'lchov turini tanlang">
              <Option value="KG">KG</Option>
              <Option value="DONA">DONA</Option>
              <Option value="PACHKA">PACHKA</Option>
            </Select>
          </Form.Item>
          
          {editingId && (
            <Form.Item
              name="amount"
              label="Miqdori"
            >
              <Input type="number" disabled />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Ombor;