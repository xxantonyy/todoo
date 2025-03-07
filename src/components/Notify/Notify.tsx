import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Notify.module.scss";

type NotifyType = "success" | "default" | "error";

interface NotifyMessage {
  id: number;
  text: string;
  type: NotifyType;
  special?: boolean
}

const NotifyType: Record<NotifyType, string> = {
  "success": '✅',
  "default": '',
  "error": '❌'
};

let addNotification: (text: string, duration?: number, type?: NotifyType, special?: boolean) => void;

const Notify = () => {
  const [notifications, setNotifications] = useState<NotifyMessage[]>([]);

  addNotification = (text: string, duration = 3000, type="default", special) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text, type, special }]);

    setTimeout(() => {
      document.getElementById(`notify-${id}`)?.classList.add("notify--hide");

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 500);
    }, duration);
  };

  return ReactDOM.createPortal(
    <div className="notify-container">
      {notifications.map((notification) => (
        <div key={notification.id} id={`notify-${notification.id}`} className={`notify notify--show ${notification.special ? 'notify--special' : ''}`}>
          {`${NotifyType[notification.type]} ${notification.text}`}
        </div>
      ))}
    </div>,
    document.body
  );
};

// Глобальная функция для вызова уведомления
/**
 * Отображает уведомление с текстом text.
 * @param {string} text - текст уведомления - success: ✅ | default: "" | error: ❌ 
 * @param {NotifyType} [type="default"] - тип уведомления
 * @param {number} [duration=3000] - продолжительность уведомления в миллисекундах
 * @param {special} [special=false] - специальное уведомление
 */
export const getNotify = (text: string, type?: NotifyType, duration?: number, special?: boolean) => {
  if (addNotification) {
    addNotification(text, duration, type, special);
  }
};

export default Notify;
