import block from 'bem-cn';
import { useEffect } from 'react';

import { ITodoResponseConverted } from '@/api/TodoApi/types';
import { category, priority } from '@/pages/ToDo/view/utils';

import useToDoModel from './model';
import cls from './ToDoItem.module.scss';

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

  useEffect(() => {}, [isMobile]);

  return (
    <>
      {!isMobile && (
        <div className={b()} onClick={() => onClick(item)}>
          <div className={b('title')}>{item.title}</div>
          <div
            className={b('status')}
            onClick={(e) => model.handleChangeStatus(item, e)}
          >
            {item.completed ? 'Выполнено' : 'Не выполнено'}
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
        <div className={b('mobile')} onClick={() => onClick(item)}>
          <div className={b('title')}>
            <div className={b('left')}>Название</div>
            <div className={b('right')}>{item.title}</div>
          </div>
          <div
            className={b('status')}
            onClick={(e) => model.handleChangeStatus(item, e)}
          >
            <div className={b('left')}>Статус</div>
            <div className={b('right')}>
              {item.completed ? 'Выполнено' : 'Не выполнено'}
            </div>
          </div>
          <div className={b('priority')}>
            <div className={b('left')}>Приоритет</div>
            <div className={b('right')}>
              <itemPriority.img />
            </div>
          </div>
          <div className={b('label')}>
            <div className={b('left')}>Категория</div>
            <div className={b('right')}>{itemCategory.label}</div>
          </div>
          <div className={b('date')}>
            <div className={b('left')}>Дата</div>
            <div className={b('right')}>
              {new Date(item.date).toLocaleDateString('ru', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToDoItem;
