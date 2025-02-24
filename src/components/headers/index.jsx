import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Headers = ({ setCollapsed, collapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        background: colorBgContainer,
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="font-base size-16 pt-4"
      />
      <div className="flex items-center gap-4">
        <UserOutlined className="cursor-pointer bg-[#00000040] size-8 p-2 text-white rounded-2xl" />
        <div className="flex gap-2 border-1 border-gray-400 cursor-pointer px-2 py-1 rounded-sm  hover:text-blue-400 hover:border-blue-400">
          <LoginOutlined />
          <Link to="/login" className="font-normal text-base">Chiqish</Link>
        </div>
      </div>
    </Header>
  );
};

export default Headers;
