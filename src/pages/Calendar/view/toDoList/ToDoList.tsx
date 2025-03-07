import block from 'bem-cn';
import { ITodoResponseConverted } from '@/api/TodoApi/types';

import cls from './ToDoList.module.scss';
import ToDoItem from './ToDoItem/ToDoItem';
import Button from '@/components/Button/Buttons';
import ToDoModal from './ToDoModal/ToDoModal';
import useCreateModal from './ToDoModal/model';

const b = block(cls.ToDoList);

interface IToDoList {
  list: ITodoResponseConverted[];
}

const ToDoList = ({ list }: IToDoList) => {
  const model = useCreateModal();

  return (
    <>
      <div className={b()}>
        <div className={b('header')}>
          <div className={b('title')}>Tasks</div>
          <Button type="button" onClick={() => model.handleOpenCreateTask()}>
            Add new task
          </Button>
        </div>
        <div className={b('content')}>
          <div className={b('headers')}>
            <div>Title</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Category</div>
            <div>Date</div>
          </div>
          {list?.map((item) => <ToDoItem key={item.id} item={item} onClick={() => model.handleClickOnTask(item)} />)}
        </div>
      </div>
      <ToDoModal model={model} />
    </>
  );
};

export default ToDoList;
