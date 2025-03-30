import { ITodoResponseConverted } from '@/api/TodoApi/types';
import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { todosActions } from '@/store/reducers/toDo/toDoSlice';

const useToDoModel = () => {
  const dispatch = useTypedDispatch();

  const handleChangeStatus = (item: ITodoResponseConverted, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(todosActions.updateTodo({ item: { ...item, completed: !item.completed } }));
  };

  return {
    handleChangeStatus,
  };
};

export default useToDoModel;
