export type ButtonSizes = 'big' | 'medium' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  props?: any;
  size?: ButtonSizes,
  children?: React.ReactNode
}
