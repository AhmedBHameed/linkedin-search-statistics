import {Menu} from 'antd';
import styled, {css} from 'styled-components';

const spaceXSmall = css`
  padding: 0 1.4rem;
`;

const StyledAntdMenu = styled(Menu)`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  border-bottom: 0;
`;

const menuItemStyle = css`
  &&.ant-menu-item,
  &&.ant-menu-submenu {
    top: 0px;
    height: 100%;
    margin-top: 0px;
  }
`;

export {spaceXSmall, StyledAntdMenu, menuItemStyle};
