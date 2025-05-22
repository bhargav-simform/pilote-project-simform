import React, { useEffect, useState } from 'react';
import {
  MenuUnfoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import styled from 'styled-components';
import logo from '../../assets/simform.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DashboardOverview from "../../components/molecules/DashboardOverview";
import MenuManagement from "../../components/molecules/MenuManagement";

const { Header, Content, Sider } = Layout;

// Styled Components
const LogoContainer = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const StyledContent = styled(Content)`
  margin: 24px;
`;

const ContentWrapper = styled.div<{ background: string; radius: string }>`
  background: ${({ background }) => background};
  border-radius: ${({ radius }) => radius};
  padding: 24px;
  min-height: 360px;
`;

const rawMenuItems = [
  { icon: DashboardOutlined, name: 'Dashboard' },
  { icon: MenuUnfoldOutlined, name: 'MenuItems' },
];

const items: MenuProps['items'] = rawMenuItems.map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.name,
}));

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const [, setIsLoggedIn] = useLocalStorage<boolean>('user-logged-in', true);
  const [searchParams] = useSearchParams();
  const keyFromParams: string | null = searchParams.get("key");
  const [selectedKey, setSelectedKey] = useState<string>(keyFromParams ?? "1");

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    if (!keyFromParams && location.pathname === "/") {
      navigate("?key=1", { replace: true });
    }
  }, [keyFromParams, location.pathname, navigate]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
    navigate(`?key=${e.key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout style={{ minHeight: '100vh' }}>
        <StyledHeader>
          <div style={{ marginLeft: 'auto' }}>
            <Button type="primary" icon={<LogoutOutlined />} danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </StyledHeader>

        <StyledContent>
          <ContentWrapper background={colorBgContainer} radius={`${borderRadiusLG}px`}>
            {selectedKey === "1" ? <DashboardOverview /> : <MenuManagement />}
          </ContentWrapper>
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
