import { classNames } from '../classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    width?: string;
    height?: string;
    border?: string;
    className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    const {
        border, width, height, className,
    } = props;

    return (
        <div
            className={classNames(cls.SkeletonWrapper, {}, [className])}
        >
            <div className={cls.Skeleton} style={{ width, height, borderRadius: border }} />
        </div>
    );
};
