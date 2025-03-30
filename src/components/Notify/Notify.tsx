import { useState } from 'react';
import ReactDOM from 'react-dom';

import cls from './Notify.module.scss';

type NotifyType = 'success' | 'default' | 'error';

interface NotifyMessage {
  id: number;
  text: string;
  type: NotifyType;
  special?: boolean;
}

// eslint-disable-next-line no-redeclare
const NotifyType: Record<NotifyType, string> = {
  success: '✅',
  default: '',
  error: '❌',
};

let addNotification: (
  text: string,
  duration?: number,
  type?: NotifyType,
  special?: boolean
) => void;

const Notify = () => {
  const [notifications, setNotifications] = useState<NotifyMessage[]>([]);

  addNotification = (
    text: string,
    duration = 3000,
    type = 'default',
    special,
  ) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      {
        id,
        text,
        type,
        special,
      },
    ]);

    setTimeout(() => {
      const el = document.getElementById(`notify-${id}`);
      if (el) {
        el.classList.add(cls['notify--hide']);
      }

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 500);
    }, duration);
  };

  const handleClick = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return ReactDOM.createPortal(
    <div className={cls['notify-container']}>
      {notifications.map((notification) => {
        const classNames = [
          cls.notify,
          cls['notify--show'],
          notification.special ? cls['notify--special'] : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={notification.id}
            id={`notify-${notification.id}`}
            className={classNames}
            onClick={() => handleClick(notification.id)}
          >
            {`${NotifyType[notification.type]} ${notification.text}`}
          </div>
        );
      })}
    </div>,
    document.body,
  );
};

export const getNotify = (
  text: string,
  type?: NotifyType,
  duration?: number,
  special?: boolean,
) => {
  if (addNotification) {
    addNotification(text, duration, type, special);
  }
};

export default Notify;
