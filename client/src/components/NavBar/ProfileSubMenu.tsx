import {CaretDownOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {ProfileMenuTitle} from '../shared/ProfileMenuTitle';

import {menuItemStyle, StyledAntdMenu} from './shared/sharedStyles';

const StyledAntdSubMenu = styled(Menu.SubMenu)`
  ${menuItemStyle};
`;

/**
 * TODO: fix Submenu bug @see https://github.com/ant-design/ant-design/issues/27176
 */
interface ProfileSubMenuProps {
  activeIndex: string;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  loginOrLogoutItemComponent: React.ReactNode;
}

const ProfileSubMenu: React.FC<ProfileSubMenuProps> = ({
  activeIndex,
  className,
  onClick,
  loginOrLogoutItemComponent,
}) => (
  <StyledAntdMenu
    className={className}
    data-testid="profile-tablet-submenu"
    mode="horizontal"
    selectedKeys={[activeIndex]}
  >
    <StyledAntdSubMenu
      icon={<UserOutlined />}
      key="profileMenu"
      title={
        <ProfileMenuTitle>
          Settings <CaretDownOutlined />
        </ProfileMenuTitle>
      }
    >
      {loginOrLogoutItemComponent}
    </StyledAntdSubMenu>
  </StyledAntdMenu>
);

export default ProfileSubMenu;
