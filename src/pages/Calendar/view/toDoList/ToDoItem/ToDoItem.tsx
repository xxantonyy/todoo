import block from 'bem-cn';

import cls from './ToDoItem.module.scss';
import { ITodoResponseConverted } from '@/api/TodoApi/types';
import { category, priority } from '@/pages/Calendar/view/utils';
import useToDoModel from './model';

const b = block(cls.ToDoItem);

interface IToDoItem {
  item: ITodoResponseConverted;
  onClick: (item: ITodoResponseConverted) => void;
}
const ToDoItem = ({ item, onClick }: IToDoItem) => {
  const model = useToDoModel();
  const itemPriority = priority[item.priority];
  const itemCategory = category[item.category];
  const isMobile = window.innerWidth < 820;

  return (
    <>
      {!isMobile && (
        <div className={b()}>
          <div className={b('title')} onClick={() => onClick(item)}>
            {item.title}
          </div>
          <div
            className={b('status')}
            onClick={() => model.handleChangeStatus(item)}
          >
            {item.completed ? 'completed' : 'not completed'}
          </div>
          <div className={b('priority')}>
            <itemPriority.img />
          </div>
          <div className={b('label')}>{itemCategory.label}</div>
          <div className={b('date')}>
            {new Date(item.date).toLocaleDateString('ru', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}

      {/* mobile */}
      {isMobile && (
        <div className={b('mobile')}>
          <div className={b('title')} onClick={() => onClick(item)}>
            {item.title}
          </div>
          <div
            className={b('status')}
            onClick={() => model.handleChangeStatus(item)}
          >
            {item.completed ? 'completed' : 'not completed'}
          </div>
          <div className={b('priority')}>
            <itemPriority.img />
          </div>
          <div className={b('label')}>{itemCategory.label}</div>
          <div className={b('date')}>
            {new Date(item.date).toLocaleDateString('ru', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ToDoItem;
