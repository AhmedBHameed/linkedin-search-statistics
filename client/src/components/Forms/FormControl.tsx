import {Form} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {mediumGathomFontStyle} from '../shared/sharedStyles';

const FormField = styled(Form.Item)`
  flex-direction: column;
  margin-bottom: 0.5rem;
  .ant-form-item-label {
    ${mediumGathomFontStyle}
    padding: 0;
    text-align: left;
    label {
      line-height: 1.5rem;
      white-space: pre-wrap;
      &:after {
        content: '';
      }
    }
  }
`;

export const FormHelperText = styled.small`
  display: flex;
  font-size: 1.1rem;
`;

interface FormControlProps {
  label?: React.ReactNode;
  className?: string;
  error?: string;
}

const FormControl: React.FC<FormControlProps> = ({
  children,
  className,
  label,
  error,
}) => (
  <FormField className={className} label={label}>
    {children}
    <FormHelperText
      className="ant-form-item-explain ant-form-item-explain-error"
      data-testid={error ? 'input-error' : ''}
    >
      {error || <>&nbsp;</>}
    </FormHelperText>
  </FormField>
);

export {FormControl};
