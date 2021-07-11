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

interface SelectOptionFieldProps {
  showSearch?: boolean;
  placeholder?: string;
  onChange?: (selectedValue: LabeledValue, option?: OptionType) => void;
  value?: LabeledValue;
  disabled?: boolean;
  defaultValue?: LabeledValue;
  options: LabeledValue[];
  className?: string;
  testId?: string;
  optionsTestId?: string;
  size?: SizeType;
  ref?: React.ForwardedRef<RefSelectProps>;
  ariaLabel: string;
  error?: boolean;
}

const SelectOptionField = forwardRef<RefSelectProps, SelectOptionFieldProps>(
  (
    {
      className,
      onChange,
      options,
      placeholder,
      showSearch,
      size,
      testId,
      value,
      defaultValue,
      disabled,
      ariaLabel,
      optionsTestId,
      error,
    },
    ref
  ) => (
    <StyledSelect
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      filterOption={(input, option) =>
        option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      labelInValue
      onChange={(selectedValue) => onChange?.(selectedValue as LabeledValue)}
      placeholder={placeholder}
      ref={ref}
      showSearch={showSearch}
      size={size}
      style={{
        borderColor: '#fff',
      }}
      /**
       * To show placeholder correctly "undefined" value must be set.
       * @see https://github.com/ant-design/ant-design/issues/16417#issuecomment-489177065
       */
      value={value || undefined}
    >
      {options.map((option) => (
        <Select.Option
          data-testid={optionsTestId}
          error={error ? 1 : 0}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </Select.Option>
      ))}
    </StyledSelect>
  )
);

export {SelectOptionField};
