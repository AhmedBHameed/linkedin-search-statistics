import {Button} from 'antd';
import React from 'react';

interface CircleButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  icon,
  onClick,
  ...reset
}) => (
  <Button
    {...reset}
    data-testid="close-button"
    icon={icon}
    onClick={onClick}
    shape="circle"
    type="primary"
  />
);

export default CircleButton;
