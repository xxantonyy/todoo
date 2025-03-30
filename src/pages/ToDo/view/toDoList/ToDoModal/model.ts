import { useState } from 'react';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { todosActions } from '@/store/reducers/toDo/toDoSlice';

interface ITask {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  category: number,
  priority: number,
}

const useCreateModal = () => {
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isPatch, setIsPatch] = useState(false);
  const [taskState, setTaskState] = useState<ITask>({
    id: '',
    title: '',
    description: '',
    completed: false,
    category: null,
    priority: null,
  });

  const handleChangeTask = (value: unknown, key: keyof ITask) => {
    switch (key) {
      case 'category':
        setTaskState({ ...taskState, category: Number(value) });
        break;
      case 'priority':
        setTaskState({ ...taskState, priority: Number(value) });
        break;
      case 'completed':
        setTaskState({ ...taskState, completed: Boolean(value) });
        break;
      case 'title':
        setTaskState({ ...taskState, title: value as string });
        break;
      case 'description':
        setTaskState({ ...taskState, description: value as string });
        break;
      default: break;
    }
  };

  const handleOpenCreateTask = () => {
    setTaskState({
      title: '', description: '', completed: false, category: 0, priority: 0, id: '',
    });
    setIsCreateTask(true);
    setIsOpen(true);
  };

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(todosActions.createTodo({ item: taskState, callback: () => { setIsOpen(false); setIsCreateTask(false); } }));
  };

  const handleClickOnTask = (task: ITask) => {
    setTaskState({
      ...task,
    });
    setIsPatch(true);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateTask(false);
    setIsOpen(false);
    setIsPatch(false);
  };

  const handlePatchTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(todosActions.updateTodo({ item: taskState, callback: () => setIsOpen(false) }));
  };

  const handleDeleteTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    dispatch(todosActions.deleteTodo({ id, callback: handleCloseModal }));
  };

  return {
    taskState,
    isOpen,
    isCreateTask,
    isPatch,
    setIsOpen,
    handleCloseModal,
    handleChangeTask,
    handleCreateTask,
    handleDeleteTask,
    handleClickOnTask,
    handlePatchTask,
    handleOpenCreateTask,
  };
};

export default useCreateModal;
