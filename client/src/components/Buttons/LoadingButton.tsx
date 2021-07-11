import {Button} from 'antd';
import {ButtonType} from 'antd/es/button';
import {ButtonHTMLType} from 'antd/lib/button/button';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import React from 'react';
import BoldLabel from '../shared/BoldLabel';

interface LoadingButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  size?: SizeType;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  type?: ButtonType;
  testId?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  className,
  disabled,
  htmlType,
  icon,
  loading,
  onClick,
  size,
  type,
  testId,
}) => (
  <Button
    className={className}
    data-testid={testId}
    disabled={disabled}
    htmlType={htmlType}
    icon={icon}
    loading={loading}
    onClick={onClick}
    size={size}
    type={type || 'primary'}
  >
    <BoldLabel>{children}</BoldLabel>
  </Button>
);

export default LoadingButton;
