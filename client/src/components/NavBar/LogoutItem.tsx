import {Menu} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {mediumGathomFontStyle} from '../shared/sharedStyles';

const Title = styled.span`
  ${mediumGathomFontStyle}
`;

interface LogoutButtonProps {
  label: string;
  icon?: React.ReactNode;
  key: string;
  onClick?: () => void;
  testId?: string;
}

const LogoutItem: React.FC<LogoutButtonProps> = (props) => {
  const {label, key, testId, ...reset} = props;

  return (
    <Menu.Item {...reset} data-testid={testId} key={key}>
      <Title>{label}</Title>
    </Menu.Item>
  );
};

export default LogoutItem;
