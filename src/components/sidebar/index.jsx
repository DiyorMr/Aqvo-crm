import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarData } from "../../data/sidebar-data";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKey = pathname.startsWith("/employees")
    ? "/employees"
    : pathname.startsWith("/shops")
    ? "/shops"
    : pathname;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical p-4 flex justify-center">
        <img
          src="https://crm.aqvo.uz/assets/logo-dac03tgN.png"
          className="w-36"
          alt="logo"
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/"]}
        selectedKeys={selectedKey}
        onClick={(item) => navigate(item.key)}
        items={sidebarData}
      />
    </Sider>
  );
};

export default Sidebar;
