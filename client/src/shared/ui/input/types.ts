import { InputHTMLAttributes } from 'react';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string | number;
  onChange: (value: string | number, field?: string) => void;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}
