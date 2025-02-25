
import { EditOutlined } from '@ant-design/icons/lib/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';



export const Columns = ({handleDelete , EditData}) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            style={{ background: "transparent", color: "blue" }}
            icon={<EditOutlined />}
            onClick={() => {EditData(record)}}
          />
          <Button
            type="primary"
            style={{ background: "transparent", color: "red" }}
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];
}

