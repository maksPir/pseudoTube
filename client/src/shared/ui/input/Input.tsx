import { FC } from 'react';
import './index.scss';
import { IInputProps } from './types';

export const Input: FC<IInputProps> = (props) => {
  const { onChange, value, className, inputRef, ...other } = props;
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      className={`input ${className}`}
      {...other}
    ></input>
  );
};
