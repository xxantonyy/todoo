export type ButtonSizes = 'big' | 'medium' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  size?: ButtonSizes,
  children?: React.ReactNode
}
