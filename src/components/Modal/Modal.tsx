import { block } from 'bem-cn'; // Если используешь bem-cn
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import cls from './Modal.module.scss';

const b = block(cls.Modal);

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div
      className={b({ open: isOpen })}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={b('content')} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={b('close')} onClick={onClose} type="button">
          ✖
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-root') as HTMLElement,
  );
};
