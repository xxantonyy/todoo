import React from 'react';
import cls from './Input.module.scss';
import { block } from 'bem-cn';

const b = block(cls.Input);

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  type?:
    | 'text'
    | 'checkbox'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'select';
  options?: { label: string; value: string | number }[]; // Только для select
}

export const Input: React.FC<IInputProps> = ({
  className,
  icon,
  title,
  type = 'text',
  options,
  ...props
}) => {
  const renderInput = () => {
    switch (type) {
      case 'checkbox':
        return (
          <input className={b('field', { type })} type="checkbox" {...props} />
        );

      case 'select':
        return (
          <select
            className={b('field', { type })}
            {...(props as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return <input className={b('field')} type={type} {...props} />;
    }
  };

  switch (type) {
    case 'select':
      return <div className={b('select')}>{renderInput()}</div>;
    case 'checkbox':
      return <div className={b('checkbox')}>{renderInput()}</div>;

    case 'text':
      return (
        <>
          {title && <span className={b('title')}>{title}</span>}
          <div className={b(null, className, {})}>
            <div className={b('wrapper')}>
              {icon && <span className={b('icon')}>{icon}</span>}
              {renderInput()}
            </div>
          </div>
        </>
      );

    case 'password':
      return (
        <>
          {title && <span className={b('title')}>{title}</span>}
          <div className={b(null, className, {})}>
            <div className={b('wrapper')}>
              {icon && <span className={b('icon')}>{icon}</span>}
              {renderInput()}
            </div>
          </div>
        </>
      );
  }
};
