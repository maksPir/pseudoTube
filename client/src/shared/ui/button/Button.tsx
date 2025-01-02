import { FC } from 'react';
import './index.scss';
import { IButtonProps } from './types';

export const Button: FC<IButtonProps> = ({ nameOfClass, onClick, text }) => {
  return (
    <button role="button" className={`button ${nameOfClass}`} onClick={onClick}>
      {text}
    </button>
  );
};
