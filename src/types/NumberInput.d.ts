import * as React from 'react';
import { InputProps } from './Input';

declare namespace NumberInput {
  interface NumberInputProps extends InputProps {
    max?: number;
    min?: number;
    step?: number | string;
    allowEmpty?: boolean;
    additional?: React.ReactNode;
    light?: boolean;
  }
}

declare class NumberInput extends React.Component<NumberInput.NumberInputProps> {}
export = NumberInput;
