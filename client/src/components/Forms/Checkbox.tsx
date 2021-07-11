import {Checkbox as AntdCheckbox} from 'antd';
import {
  AbstractCheckboxProps,
  CheckboxChangeEvent,
} from 'antd/lib/checkbox/Checkbox';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const StyledAntdCheckbox = styled(AntdCheckbox).withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{error?: boolean}>((props) => {
  const {error} = props;

  return error
    ? `
    .ant-checkbox .ant-checkbox-inner {
      border-color: ${props.theme.colors.red};
      border-width: 0.2rem;
    }
  `
    : '';
});

interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  label?: React.ReactNode;
  value?: boolean;
  className?: string;
  error?: string;
  ariaLabel: string;
  testId?: string;
  onChange?: (event: CheckboxChangeEvent) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({onChange, ariaLabel, value, className, error, testId, label}, ref) => (
    <StyledAntdCheckbox
      aria-label={ariaLabel}
      checked={value}
      className={className}
      data-testid={testId}
      error={!!error}
      onChange={onChange}
      ref={ref}
    >
      {label}
    </StyledAntdCheckbox>
  )
);

export {Checkbox};
