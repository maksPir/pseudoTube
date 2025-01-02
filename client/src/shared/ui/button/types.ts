import { PropsWithChildren } from 'react';

export interface IButtonProps extends PropsWithChildren {
  text: string;
  nameOfClass: string;
  onClick: () => void;
}
