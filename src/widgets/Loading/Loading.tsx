import { memo } from 'react';
import cls from './Loading.module.scss';

export const Loading = memo(() => (
    <div className={cls.wrapper}>
        <div className={cls.loader} />
    </div>
));
