import {Slider} from 'antd';
import {SliderRangeProps} from 'antd/lib/slider';
import React from 'react';
import styled from 'styled-components';

const AntdSlider = Slider as React.FC<
  Omit<SliderRangeProps, 'range' | 'onChange' | 'value'> & {
    onChange?: (value: number) => void;
    value?: number;
  }
>;

const Container = styled.div`
  position: relative;
  padding: 0 3rem;
  .anticon {
    position: absolute;
    top: -0.2rem;
    width: 1.6rem;
    height: 1.6rem;
    color: rgba(0, 0, 0, 0.5);
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
`;

interface SliderFieldProps {
  value?: number;
  min: number;
  max: number;
  onChange?: (value: number) => void;
  className?: string;
  testId?: string;
  leftLabel?: React.ReactNode | string;
  rightLabel?: React.ReactNode | string;
  ariaLabel: string;
}

const SliderField: React.FC<SliderFieldProps> = ({
  value,
  min,
  max,
  testId,
  onChange,
  rightLabel,
  leftLabel,
  className,
  ariaLabel,
}) => {
  const hasSvgs =
    typeof leftLabel === 'object' && typeof rightLabel === 'object'; // MEans they are components

  return (
    <Container data-testid={testId}>
      {hasSvgs && leftLabel}
      <AntdSlider
        aria-label={ariaLabel}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className={className}
        marks={
          !hasSvgs
            ? {
                [min]: {label: <strong>{leftLabel}</strong>},
                [max]: {label: <strong>{rightLabel}</strong>},
              }
            : undefined
        }
        max={max}
        min={min}
        onChange={onChange}
        value={value}
      />
      {hasSvgs && rightLabel}
    </Container>
  );
};

export {SliderField};
