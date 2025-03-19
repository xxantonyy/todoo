import block from 'bem-cn';
import { ITodoResponseConverted } from '@/api/TodoApi/types';

import cls from './ToDoList.module.scss';
import ToDoItem from './ToDoItem/ToDoItem';
import Button from '@/components/Button/Buttons';
import ToDoModal from './ToDoModal/ToDoModal';
import useCreateModal from './ToDoModal/model';
import { useMemo } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const b = block(cls.ToDoList);

interface IToDoList {
  list: ITodoResponseConverted[];
}

const ToDoList = ({ list }: IToDoList) => {
  const model = useCreateModal();
  const isMobile = window.innerWidth < 820;
  const actionProcessing = useTypedSelector((state) => state.todos.actionProcessing);

  const items = useMemo(() => {
    if (list?.length) {
      return list?.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onClick={() => model.handleClickOnTask(item)}
        />
      ));
    } else {
      if(!actionProcessing) {
        <div>
          <p>Задач нету, пора что-то придумать!</p>
        </div>
      } else {
        return null
      }
    }
  }, [list]);

  return (
    <>
      {!isMobile && (
        <div className={b()}>
          <div className={b('header')}>
            <div className={b('title')}>Задачи</div>
            <Button type="button" onClick={() => model.handleOpenCreateTask()}>
              Новая задача
            </Button>
          </div>
          {list.length > 0 ? (
            <div className={b('content')}>
              <div className={b('headers')}>
                <div>Заголовок</div>
                <div>Статус</div>
                <div>Приоритет</div>
                <div>Категория</div>
                <div>Дата</div>
              </div>
              {items}
            </div>
          ) : (
            <div>{items}</div>
          )}
        </div>
      )}

      {/* mobile */}
      {isMobile && (
        <div className={b()}>
          <div className={b('header')}>
            <div className={b('title')}>Задачи</div>
            <Button type="button" onClick={() => model.handleOpenCreateTask()}>
              Новая задача
            </Button>
          </div>
          <div className={b('content')}>{items}</div>
        </div>
      )}
      <ToDoModal model={model} />
    </>
  );
};

export default ToDoList;
