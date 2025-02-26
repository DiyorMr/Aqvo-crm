import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Table, Typography } from 'antd';
import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpRequest from '../../axios';

const { Title } = Typography;
const { Option } = Select;

const Ombor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await httpRequest.get('/categories');
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
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
      category: record.category,
      unit: record.unit,
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
      const payload = {
        category: values.category,
        unit: values.unit
      };
      
      if (editingId) {
        await httpRequest.patch(`/categories/${editingId}`, payload);
        toast.success('Category updated successfully');
      } else {
        await httpRequest.post('/categories', payload);
        toast.success('Category added successfully');
      }
      
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  // Modified delete function with additional logging and error handling
  const handleDelete = async (id) => {
    console.log('Delete requested for ID:', id);
    
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoading(true);
        try {
          console.log('Making DELETE request to:', `/categories/${id}`);
          const response = await httpRequest.delete(`/categories/${id}`);
          console.log('Delete response:', response);
          
          toast.success('Category deleted successfully');
          // Immediate local update for better UX
          setData(prevData => prevData.filter(item => item.id !== id));
          // Then refresh from server
          await fetchCategories();
        } catch (error) {
          console.error('Delete failed:', error);
          toast.error(`Failed to delete category: ${error.message || 'Unknown error'}`);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Filter the data based on search text
  const filteredData = data.filter(item => 
    item.category?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: 'Nomi',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Miqdori',
      dataIndex: 'miqdori',
      key: 'miqdori',
      render: (_, record) => {
        if (record.products && record.products.length > 0) {
          return record.products.reduce((sum, product) => sum + (product.quantity || 0), 0);
        }
        return 0;
      },
      sorter: (a, b) => {
        const aTotal = a.products ? a.products.reduce((sum, product) => sum + (product.quantity || 0), 0) : 0;
        const bTotal = b.products ? b.products.reduce((sum, product) => sum + (product.quantity || 0), 0) : 0;
        return aTotal - bTotal;
      }
    },
    {
      title: "O'lchov turi",
      dataIndex: 'unit',
      key: 'unit',
      filters: [
        { text: 'KG', value: 'KG' },
        { text: 'DONA', value: 'DONA' },
        { text: 'PACHKA', value: 'PACHKA' },
      ],
      onFilter: (value, record) => record.unit === value
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
            danger
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
            title="Delete category"
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
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
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
        dataSource={filteredData}
        rowKey={(record) => record.id || Math.random()}
        loading={loading}
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50']
        }}
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