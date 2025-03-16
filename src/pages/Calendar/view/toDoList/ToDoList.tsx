import block from 'bem-cn';
import { ITodoResponseConverted } from '@/api/TodoApi/types';

import cls from './ToDoList.module.scss';
import ToDoItem from './ToDoItem/ToDoItem';
import Button from '@/components/Button/Buttons';
import ToDoModal from './ToDoModal/ToDoModal';
import useCreateModal from './ToDoModal/model';
import { useMemo } from 'react';

const b = block(cls.ToDoList);

interface IToDoList {
  list: ITodoResponseConverted[];
}

const ToDoList = ({ list }: IToDoList) => {
  const model = useCreateModal();
  const isMobile = window.innerWidth < 820;

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
      return (
        <div>
          <p>Задач нету, пора что-то придумать!</p>
        </div>
      );
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
                <div>Title</div>
                <div>Status</div>
                <div>Priority</div>
                <div>Category</div>
                <div>Date</div>
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
