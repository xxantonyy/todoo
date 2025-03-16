import { memo, useEffect } from 'react';
import block from 'bem-cn';
import styles from './Main.module.scss';
import { getNotify } from '@/components/Notify/Notify';
import Button from '@/components/Button/Buttons';

const b = block(styles.main);

const Main = memo(() => {
  return (
    <div className={b()}>
      <span className={b('name')}>Главная страница, предложи что тут написать</span>
      {/* <Button onClick={() => getNotify('ФИШКА ЕПТА', 'success', 3000, true)}>Фишка</Button> */}
    </div>
  );
});

export default Main;
