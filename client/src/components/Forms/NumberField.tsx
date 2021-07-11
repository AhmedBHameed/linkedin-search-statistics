import {InputNumber} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const StyledInputNumber = styled(InputNumber).withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{error?: boolean}>((props) => {
  const {error} = props;
  const {red} = props.theme.colors;

  return `
      width: 100%;
      ${error ? `border-color: ${red};` : ''}
    `;
});

interface NumberFieldProps {
  placeholder?: string;
  className?: string;
  name?: string;
  size?: SizeType;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  testId?: string;
  ariaLabel: string;
  error?: boolean;
}

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      name,
      className,
      min,
      max,
      error,
      ariaLabel,
      placeholder,
      size,
      value,
      onChange,
      testId,
    },
    ref
  ) => (
    <StyledInputNumber
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      error={error}
      max={max}
      min={min}
      name={name}
      onChange={(currentValue) => onChange?.(currentValue as number)}
      placeholder={placeholder}
      ref={ref}
      size={size}
      type="number"
      value={value}
    />
  )
);

export {NumberField};
