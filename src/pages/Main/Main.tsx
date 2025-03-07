import { memo, useEffect } from 'react';
import block from 'bem-cn';
import styles from './Main.module.scss';

const b = block(styles.main);

const Main = memo(() => {
  return (
    <div className={b()}>
      <span className={b('name')}>Main</span>
    </div>
  );
});

export default Main;
