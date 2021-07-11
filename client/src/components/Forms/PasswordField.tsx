import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Input} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const StyledInputPassword = styled(Input.Password).withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{error?: boolean}>((props) => {
  const {error} = props;
  const {red} = props.theme.colors;

  return `
    width: 100%;
    ${error ? `border-color: ${red};` : ''}
    .ant-input-number-handler-wrap {
      display: none;
    }
`;
});
interface PasswordFieldProps {
  prefixIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  size?: SizeType;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  testId?: string;
  ariaLabel: string;
  error?: boolean;
}

const PasswordField = forwardRef<Input, PasswordFieldProps>(
  (
    {
      name,
      prefixIcon,
      error,
      placeholder,
      ariaLabel,
      value,
      onChange,
      size,
      testId,
    },
    ref
  ) => (
    <StyledInputPassword
      aria-label={ariaLabel}
      data-testid={testId}
      error={error}
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      prefix={prefixIcon}
      ref={ref}
      size={size}
      value={value}
    />
  )
);

export {PasswordField};
