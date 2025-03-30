import block from 'bem-cn';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getNotify } from '@/components/Notify/Notify';
import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { todosActions } from '@/store/reducers/toDo/toDoSlice';

import cls from './ToDos.module.scss';
import ToDoList from './view/toDoList/ToDoList';

const b = block(cls.toDos);

const ToDos = memo(() => {
  const dispatch = useTypedDispatch();
  const navigation = useNavigate();
  const { todos } = useTypedSelector((state) => state.todos);
  const { auth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (auth === null) {
      getNotify('Вы не авторизованы!', 'error', 3000);
      navigation('/');
      return;
    }

    dispatch(todosActions.getTodos({ data: {} }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={b()}>
      <div className={b('content')}>
        <ToDoList list={todos} />
      </div>
    </div>
  );
});

export default ToDos;
