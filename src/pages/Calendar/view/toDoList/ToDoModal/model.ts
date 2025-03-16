import { useState } from "react";
import { categories, priorities } from "./utils";
import { useTypedDispatch } from "@/hooks/useTypedDispatch";
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
    category: 0,
    priority: 0,
  });

  const handleChangeTask = (value: any, key: keyof ITask) => {
    switch (key) {
      case 'category':
        setTaskState({ ...taskState, category: Number(value) });
        break;
      case 'priority':
        setTaskState({ ...taskState, priority: Number(value) });
        break;
      case 'completed':
        setTaskState({ ...taskState, completed: value });
        break;
      case 'title':
        setTaskState({ ...taskState, title: value });
        break;
      case 'description':
        setTaskState({ ...taskState, description: value });
        break;
      default: break;
    }
  }

  const handleOpenCreateTask = () => {
    setTaskState({ title: '', description: '', completed: false, category: 0, priority: 0, id: '' });
    setIsCreateTask(true);
    setIsOpen(true);
  };

  const handleCreateTask = (e: any) => {
    e.preventDefault();
    setIsCreateTask(false);
    setIsOpen(false);
    setIsPatch(false);
    dispatch(todosActions.createTodo({item: taskState, callback: () => setIsOpen(false)}));
  }

  const handleClickOnTask = (task: ITask) => {
    setTaskState({
      ...task,
    });
    setIsPatch(true);
    setIsOpen(true)
  };

  const handleCloseModal = () => {
    setIsCreateTask(false);
    setIsOpen(false);
    setIsPatch(false);
  }

  const handlePatchTask = (e: any) => {
    e.preventDefault();
    dispatch(todosActions.updateTodo({item: taskState, callback: () => setIsOpen(false)}));
  }


  const handleDeleteTask = (e: any, id: string) => {
    e.preventDefault();
    dispatch(todosActions.deleteTodo({id , callback:handleCloseModal}));
  }

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
}

export default useCreateModal;