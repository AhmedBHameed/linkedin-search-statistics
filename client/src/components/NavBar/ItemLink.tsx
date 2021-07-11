import {Menu} from 'antd';
import React from 'react';

import styled from 'styled-components';
import LinkItem from '../shared/LinkItem';
import {menuItemStyle} from './shared/sharedStyles';

const StyledAntdMenuItem = styled(Menu.Item)`
  ${menuItemStyle}
`;
interface ItemLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ItemLink: React.FC<ItemLinkProps> = (props) => {
  const {to, label, ...reset} = props;
  return (
    <StyledAntdMenuItem {...reset} data-testid="navbar-item">
      <LinkItem to={to}>{label}</LinkItem>
    </StyledAntdMenuItem>
  );
};

export default ItemLink;
