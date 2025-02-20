import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Headers, Sidebar } from "./components";
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Headers collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="my-6 mx-4 p-6 min-h-[280px]"
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
