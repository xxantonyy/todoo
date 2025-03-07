import { ButtonProps } from './types';

import cls from './Button.module.scss';
import block from 'bem-cn';

const b = block(cls.Button);
const Button = ({ children, size = 'medium', className, ...props }: ButtonProps) => {
  return (
    // <button {...props} className={classNames(cls.Button, {}, [cls[size], cls[className]])}>
    <button {...props} className={b({ size, type: className })}>
      {children}
    </button>
  );
};

export default Button;
