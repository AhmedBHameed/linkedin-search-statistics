import {MenuOutlined} from '@ant-design/icons';

import {Button} from 'antd';
import React from 'react';
import styled from 'styled-components';

const BurgerIcon = styled(MenuOutlined)`
  font-size: 2rem;
`;

const StyledButton = styled(Button)`
  border: 0;
`;

interface BurgerButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({onClick}) => (
  <StyledButton
    data-testid="burger-button"
    icon={<BurgerIcon />}
    onClick={onClick}
    type="text"
  />
);

export default BurgerButton;
