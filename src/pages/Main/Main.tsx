import { memo } from 'react';
import block from 'bem-cn';
import styles from './Main.module.scss';

const b = block(styles.main);

const Main = memo(() => {
  return (
    <div className={b()}>
      <div style={{ fontSize: '24px' }}>Новости</div>
      <hr style={{ width: '100%' }} />
      <div className={b('news')}>
        <div className={b('item')}>
          <div>Обновление 19.03.2025</div>
          <div>✅ 1 - Были пофишкены все подсвеченые баги </div>
          <div>✅ 2 - Добавлен функционал для фильтрации сообщений </div>
        </div>
      </div>
    </div>
  );
});

export default Main;
