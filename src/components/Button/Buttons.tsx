import block from 'bem-cn';

import cls from './Button.module.scss';
import { ButtonProps } from './types';

const b = block(cls.Button);
const Button = ({
  children, size = 'medium', className, ...props
}: ButtonProps) => (
  // <button {...props} className={classNames(cls.Button, {}, [cls[size], cls[className]])}>
  // eslint-disable-next-line react/button-has-type
  <button {...props} className={b({ size, type: className })}>
    {children}
  </button>
);

export default Button;
