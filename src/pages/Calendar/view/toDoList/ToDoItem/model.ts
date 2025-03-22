import { ITodoResponseConverted } from "@/api/TodoApi/types";
import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { todosActions } from '@/store/reducers/toDo/toDoSlice';
import { useState } from "react";

const useToDoModel = () => {
  const dispatch = useTypedDispatch();

  const handleChangeStatus = (item: ITodoResponseConverted, e: any) => {
    e.stopPropagation();
    dispatch(todosActions.updateTodo({ item: { ...item, completed: !item.completed } }))
  }

  return {
    handleChangeStatus,
  }
}

export default useToDoModel;