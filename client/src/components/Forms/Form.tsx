import React from 'react';
import {Checkbox} from './Checkbox';
import {FormControl} from './FormControl';
import {InputField} from './InputField';
import {MultipleSelectOptionField} from './MultipleSelectOptionField';
import {PasswordField} from './PasswordField';
import {RadioField} from './RadioField';
import {SelectOptionField} from './SelectOptionField';
import {SliderField} from './SliderField';
import {TextareaField} from './TextareaField';

interface FormProps {
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  testId?: string;
}

const Form: React.FC<FormProps> = ({className, onSubmit, children, testId}) => (
  <form className={className} data-testid={testId} onSubmit={onSubmit}>
    {children}
  </form>
);

export {
  Checkbox,
  Form,
  FormControl,
  InputField,
  MultipleSelectOptionField,
  PasswordField,
  RadioField,
  SelectOptionField,
  SliderField,
  TextareaField,
};
