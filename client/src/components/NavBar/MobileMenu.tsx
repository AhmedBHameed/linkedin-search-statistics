import {
  BarChartOutlined,
  DashboardOutlined,
  FileSearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Menu as AntdMenu, Drawer} from 'antd';
import React from 'react';

import styled from 'styled-components';
import NAVIGATION_ROUTES from '../../config/NavigationRoutes';
import {ProfileMenuTitle} from '../shared/ProfileMenuTitle';
import ItemLink from './ItemLink';
import LogoutItem from './LogoutItem';
import NavBrand from './NavBrand';
import {spaceXSmall} from './shared/sharedStyles';

const {SubMenu} = AntdMenu;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header {
    ${spaceXSmall}
  }
  .ant-drawer-body {
    padding: 2.4rem 0;
  }
`;

interface MenuProps {
  open: boolean;
  activeIndex: string;
  onClose?: () => void;
  onLogout?: () => void;
  isAuthorized?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  open,
  activeIndex,
  isAuthorized,
  onClose,
  onLogout,
}) => (
  <StyledDrawer
    closable={false}
    data-testid="drawer-navigation"
    key="drawer-menu"
    onClose={onClose}
    placement="left"
    title={<NavBrand />}
    visible={open}
  >
    <AntdMenu
      inlineCollapsed={false}
      mode="inline"
      selectedKeys={[activeIndex]}
    >
      {isAuthorized && (
        <ItemLink
          icon={<DashboardOutlined />}
          key="1"
          label="Dashboard"
          onClick={onClose}
          to={NAVIGATION_ROUTES.dashboard.path}
        />
      )}

      <ItemLink
        icon={<BarChartOutlined />}
        key="2"
        label="Statistics"
        onClick={onClose}
        to={NAVIGATION_ROUTES.statistics.path}
      />

      <ItemLink
        icon={<FileSearchOutlined />}
        key="3"
        label="Jobs"
        onClick={onClose}
        to={NAVIGATION_ROUTES.jobs.path}
      />

      <SubMenu
        icon={<UserOutlined />}
        key="mobile-sub-menu"
        title={<ProfileMenuTitle>Settings</ProfileMenuTitle>}
      >
        <AntdMenu.Divider />

        {isAuthorized ? (
          <LogoutItem
            key="8"
            label="Logout"
            onClick={onLogout}
            testId="navbar-logout-item"
          />
        ) : (
          <ItemLink key="8" label="Login" to={NAVIGATION_ROUTES.login.path} />
        )}
      </SubMenu>
    </AntdMenu>
  </StyledDrawer>
);

export default Menu;
