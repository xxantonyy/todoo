import block from 'bem-cn';
import { memo } from 'react';

import cls from './Main.module.scss';

const b = block(cls.main);

const Main = memo(() => (
  <div className={b()}>
    <div style={{ fontSize: '24px' }}>Новости</div>

    <hr style={{ width: '100%' }} />
    <div className={b('news')}>
      <div className={b('item')}>
        <div>Обновление 29.03.2025</div>
        <div>✅ 1 - Оптимизация рендера</div>
        <div>✅ 2 - Оптимизация запросов</div>
        <div>
          ✅ 3 - Добавлены различные виды уведомлений при обработке ответов и
          ошибок при запросе к серверу
        </div>
      </div>
    </div>

    <hr style={{ width: '100%' }} />
    <div className={b('news')}>
      <div className={b('item')}>
        <div>Обновление 22.03.2025</div>
        <div>
          ✅ 1 - Теперь при клике в любое место на таске она открывается, по
          клику на статус по прежнему изменяется статус
        </div>
      </div>
    </div>

    <hr style={{ width: '100%' }} />
    <div className={b('news')}>
      <div className={b('item')}>
        <div>Обновление 20.03.2025</div>
        <div>
          ✅ 1 - Был исправлен баг с фильтром, теперь фильтра сохраняется на
          постоянной основе{' '}
        </div>
        <div>
          ✅ 2 - Был исправлен баг с фильтром, при смене статуса фильтр
          сбрасывался и задачи получались по новой, теперь фильтр не
          сбрасывается и запоминается состояние фильтра между обновлениями{' '}
        </div>
      </div>
    </div>

    <hr style={{ width: '100%' }} />
    <div className={b('news')}>
      <div className={b('item')}>
        <div>Обновление 19.03.2025</div>
        <div>✅ 1 - Были пофишкены все подсвеченые баги </div>
        <div>✅ 2 - Добавлен функционал для фильтрации сообщений </div>
      </div>
    </div>
  </div>
));

export default Main;
