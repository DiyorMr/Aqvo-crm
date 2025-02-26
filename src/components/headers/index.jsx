import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useAuth } from "../../hooks/AuthProvider";

const { Header } = Layout;

const Headers = ({ setCollapsed, collapsed }) => {
  const auth = useAuth();

  return (
    <Header
      style={{
        background: "#fff",
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
        <UserOutlined className="cursor-pointer bg-black/20 rounded-full p-3" />
        <button
          type="button"
          className="flex gap-2 border-1 border-gray-400 cursor-pointer px-2 py-1 rounded-sm  hover:text-blue-400 hover:border-blue-400"
          onClick={() => auth.logOut()}
        >
          <LoginOutlined />
          <span className="font-normal text-base">Chiqish</span>
        </button>
      </div>
    </Header>
  );
};

export default Headers;
