import { memo, useEffect } from 'react';
import block from 'bem-cn';
import styles from './Main.module.scss';
import { getNotify } from '@/components/Notify/Notify';
import Button from '@/components/Button/Buttons';

const b = block(styles.main);

const Main = memo(() => {
  return (
    <div className={b()}>
      <div className={b('news')}>
        <div>Обновление :</div>
        <div>✅ 1 - Были пофишкены все подсвеченые баги </div>
        <div>✅ 2 - Добавлен функционал для фильтрации сообщений </div>
      </div>
    </div>
  );
});

export default Main;
