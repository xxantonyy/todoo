import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { todosActions } from "@/store/reducers/toDo/toDoSlice";
import { IToDoPayload } from "@/store/reducers/toDo/types";
import { useEffect, useState } from "react";

const useFilters = () => {
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sortOrder = useTypedSelector(state => state.todos.sortOrder);

  const handleOpenFilters = () => setIsOpen(true);
  const handleCloseFilters = () => setIsOpen(false);

  const handleChangeFilters = (value: any, key: keyof IToDoPayload) => {
    switch (key) {
      case 'priority':
        dispatch(todosActions.changeSortOrder({ key: 'priority', value: value !== '' ? value : null }));
        break;
      case 'category':
        dispatch(todosActions.changeSortOrder({ key: 'category', value: value !== '' ? value : null }));
        break;
      case 'sortBy':
        dispatch(todosActions.changeSortOrder({ key: 'sortBy', value }));
        break;
      case 'order':
        dispatch(todosActions.changeSortOrder({ key: 'order', value }));
        break;
      case 'completed':
        dispatch(todosActions.changeSortOrder({ key: 'completed', value }));
        break;
      case 'date':
        dispatch(todosActions.changeSortOrder({ key: 'completed', value }));
        break;
      default: break;
    }
  }

  const handleSendFilters = (e: any) => {
    e.preventDefault();

    dispatch(todosActions.getTodos({ data: sortOrder }));
    handleCloseFilters();
  }

  const handleRefreshFilters = (e: any) => {
    e.preventDefault();
    dispatch(todosActions.changeSortOrder({ all: true }));

  }

  return {
    isOpen,
    sortOrder,
    setSortOrder: todosActions.changeSortOrder,
    handleOpenFilters,
    handleCloseFilters,
    handleSendFilters,
    handleChangeFilters,
    handleRefreshFilters,
  }

}

export default useFilters