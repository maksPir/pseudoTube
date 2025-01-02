import { InputHTMLAttributes } from 'react';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange: (value: string | number, field?: string) => void;
  value: string | number;
  rules?: RegExp;
  text?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}
