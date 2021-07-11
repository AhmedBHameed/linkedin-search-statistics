import {Button} from 'antd';
import {ButtonType} from 'antd/lib/button';
import {ButtonHTMLType} from 'antd/lib/button/button';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import React from 'react';
import BoldLabel from '../shared/BoldLabel';

interface BaseButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: ButtonType;
  bold?: boolean;
  size?: SizeType;
  className?: string;
  icon?: React.ReactNode;
  testId?: string;
  disabled?: boolean;
  htmlType?: ButtonHTMLType;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  type,
  bold,
  icon,
  disabled,
  onClick,
  className,
  size,
  testId,
  htmlType,
}) => (
  <Button
    className={className}
    data-testid={testId}
    disabled={disabled}
    htmlType={htmlType}
    icon={icon}
    onClick={onClick}
    size={size}
    type={type}
  >
    {!icon && bold ? <BoldLabel>{children}</BoldLabel> : <>{children}</>}
  </Button>
);

export default BaseButton;
