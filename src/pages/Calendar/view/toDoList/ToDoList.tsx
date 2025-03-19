import block from 'bem-cn';
import { ITodoResponseConverted } from '@/api/TodoApi/types';

import cls from './ToDoList.module.scss';
import ToDoItem from './ToDoItem/ToDoItem';
import Button from '@/components/Button/Buttons';
import ToDoModal from './ToDoModal/ToDoModal';
import useCreateModal from './ToDoModal/model';
import { useMemo } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useFilters from './FiltersModal/useFilters';
import FiltersModal from './FiltersModal/FiltersModal';
import { Loading } from '@/widgets/Loading/Loading';

const b = block(cls.ToDoList);

interface IToDoList {
  list: ITodoResponseConverted[];
}

const ToDoList = ({ list }: IToDoList) => {
  const model = useCreateModal();
  const filters = useFilters();
  const isMobile = window.innerWidth < 820;
  const actionProcessing = useTypedSelector(
    (state) => state.todos.actionProcessing
  );

  const items = useMemo(() => {
    if (list?.length > 0) {
      return list?.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onClick={() => model.handleClickOnTask(item)}
        />
      ));
    } else if (!actionProcessing) {
      return <div>Задач нету, пора что-то придумать!</div>;
    }
  }, [list]);

  return (
    <>
    {/* {!actionProcessing ? <Loading /> : ''} */}
      {!isMobile && (
        <div className={b()}>
          <div className={b('header')}>
            <div className={b('title')}>Задачи</div>
            <div className={b('buttons')}>
              <Button type="button" onClick={() => filters.handleOpenFilters()}>
                Фильтры
              </Button>
              <Button
                type="button"
                onClick={() => model.handleOpenCreateTask()}
              >
                Новая задача
              </Button>
            </div>
          </div>
          {list?.length > 0 ? (
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
          <div>
            <Button type="button" onClick={() => filters.handleOpenFilters()}>
              Фильтры
            </Button>
          </div>
          <div className={b('content')}>{items}</div>
        </div>
      )}
      <ToDoModal model={model} />
      <FiltersModal model={filters} />
    </>
  );
};

export default ToDoList;
