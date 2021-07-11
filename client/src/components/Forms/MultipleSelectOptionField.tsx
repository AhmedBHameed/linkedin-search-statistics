import {Select} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {LabeledValue, OptionType, RefSelectProps} from 'antd/lib/select';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

const StyledSelect = styled(Select).withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{error?: boolean}>((props) => {
  const {error} = props;
  const {red} = props.theme.colors;

  return `
    width: 100%;
    .ant-select-selector {
      ${error ? `border-color: ${red} !important;` : ''}
    }
`;
});

interface MultipleSelectOptionFieldProps {
  placeholder?: string;
  onChange?: (selectedValue: (string | number)[], option?: OptionType) => void;
  value?: (string | number)[];
  disabled?: boolean;
  defaultValue?: string[];
  options: LabeledValue[];
  className?: string;
  testId?: string;
  optionsTestId?: string;
  size?: SizeType;
  ariaLabel: string;
  ref?: React.ForwardedRef<RefSelectProps>;
  ariaRequired: boolean;
  ariaExpanded: boolean;
  error?: boolean;
}

const MultipleSelectOptionField = forwardRef<
  RefSelectProps,
  MultipleSelectOptionFieldProps
>(
  (
    {
      className,
      onChange,
      options,
      placeholder,
      size,
      error,
      testId,
      value,
      defaultValue,
      ariaLabel,
      optionsTestId,
      disabled,
      ariaRequired,
      ariaExpanded,
    },
    ref
  ) => (
    <StyledSelect
      allowClear
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      className={className}
      data-testid={testId}
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      mode="multiple"
      onChange={(selectedValue) =>
        onChange?.(selectedValue as (string | number)[])
      }
      placeholder={placeholder}
      ref={ref}
      showArrow
      showSearch={false}
      size={size}
      value={value}
    >
      {options.map((option) => (
        <Select.Option
          data-testid={optionsTestId}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </Select.Option>
      ))}
    </StyledSelect>
  )
);

export {MultipleSelectOptionField};
