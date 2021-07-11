import {ValidationError} from 'joi';

export interface ValidationResultData<T> {
  error?: ValidationError;
  errors?: ValidationError;
  warning?: ValidationError;
  value: T;
}
