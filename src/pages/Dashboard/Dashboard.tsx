import React from 'react';
import {
  MenuUnfoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from "./DashboardOverview";
import MenuManagement from "./MenuManagement";

const { Header, Content, Sider } = Layout;

const items = [
  { icon: DashboardOutlined, name: 'Dashboard' },
  { icon: MenuUnfoldOutlined, name: 'MenuItems' },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.name,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate()

  const [, setIsLoggedIn] = useLocalStorage<boolean>('user-logged-in', true);

  const [selectedKey, setSelectedKey] = React.useState("1");

  const handleLogout = () => {
    setIsLoggedIn(false)
    nav("/sign-in");
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={e => setSelectedKey(e.key)}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          <div style={{ marginLeft: 'auto' }}>
            <Button type="primary" icon={<LogoutOutlined />} danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: 24 }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
              minHeight: 360,
            }}
          >
            {selectedKey === "1" ? <DashboardOverview /> : <MenuManagement />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;