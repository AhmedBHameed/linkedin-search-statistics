import {Input} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {TextAreaRef} from 'antd/lib/input/TextArea';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const {TextArea} = Input;

const StyledTextArea = styled(TextArea).withConfig({
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

interface TextareaFieldProps {
  className?: string;
  maxLength?: number;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  size?: SizeType;
  testId?: string;
  value?: string | number;
  ariaLabel: string;
  error?: boolean;
}

const TextareaField = forwardRef<TextAreaRef, TextareaFieldProps>(
  (
    {
      className,
      maxLength,
      name,
      onChange,
      placeholder,
      size,
      testId,
      value,
      ariaLabel,
      error,
    },
    ref
  ) => (
    <StyledTextArea
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      error={error}
      maxLength={maxLength}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      showCount
      size={size}
      value={value}
    />
  )
);

export {TextareaField};
