import {Input} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input).withConfig({
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

interface InputFieldProps {
  prefixIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  size?: SizeType;
  type?: 'text' | 'number' | 'password';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  testId?: string;
  ariaLabel: string;
  error?: boolean;
  maxLength?: number;
  min?: number;
}

const InputField = forwardRef<Input, InputFieldProps>(
  (
    {
      name,
      disabled,
      type,
      prefixIcon,
      placeholder,
      size,
      value,
      error,
      min,
      onChange,
      testId,
      maxLength,
      ariaLabel,
    },
    ref
  ) => (
    <StyledInput
      aria-label={ariaLabel}
      data-testid={testId}
      disabled={disabled}
      error={error}
      maxLength={maxLength}
      min={min}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      prefix={prefixIcon}
      ref={ref}
      size={size}
      type={type || 'text'}
      value={value}
    />
  )
);

export {InputField};
