import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { todosActions } from "@/store/reducers/toDo/toDoSlice";
import { IToDoPayload } from "@/store/reducers/toDo/types";
import { useState } from "react";

const useFilters = () => {
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<IToDoPayload>({
    priority: null,
    category: null,
    sortBy: null,
    order: null,
    date: null,
    completed: null,
  });

  const handleOpenFilters = () => setIsOpen(true);
  const handleCloseFilters = () => setIsOpen(false);

  const handleChangeFilters = (value: any, key: keyof IToDoPayload) => {
    switch (key) {
      case 'priority':
        setSortOrder({ ...sortOrder, priority: Number(value) >= 0 ? Number(value) : null });
        break;
      case 'category':
        setSortOrder({ ...sortOrder, category: Number(value) >= 0 ? Number(value) : null });
        break;
      case 'sortBy':
        setSortOrder({ ...sortOrder, sortBy: value });
        break;
      case 'order':
        setSortOrder({ ...sortOrder, order: value });
        break;
      case 'completed':
        setSortOrder({ ...sortOrder, completed: value });
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
    setSortOrder({ priority: null, category: null, sortBy: null, order: null, date: null, completed: null });
  }

  return {
    isOpen,
    sortOrder,
    setSortOrder,
    handleOpenFilters,
    handleCloseFilters,
    handleSendFilters,
    handleChangeFilters,
    handleRefreshFilters,
  }

}

export default useFilters