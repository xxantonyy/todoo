import { memo, useEffect } from 'react';

import block from 'bem-cn';

import { todosActions } from '@/store/reducers/toDo/toDoSlice';
import { useTypedDispatch } from '@/hooks/useTypedDispatch';

import cls from './Calendar.module.scss';
import ToDoList from './view/toDoList/ToDoList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getNotify } from '@/components/Notify/Notify';
import { useNavigate } from 'react-router-dom';

const b = block(cls.Calendar);

const Calendar = memo(() => {
  const dispatch = useTypedDispatch();
  const navigation = useNavigate();
  const { todos } = useTypedSelector((state) => state.todos);
  const { auth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (auth === null) {
      getNotify('You are not authorized', 'error', 3000);
      navigation('/');
      return;
    }

    dispatch(
      todosActions.getTodos({ data: { }})
    );
  }, []);

  return (
    <div className={b()}>
      <div className={b('content')}>
        <ToDoList list={todos} />
      </div>
    </div>
  );
});

export default Calendar;
