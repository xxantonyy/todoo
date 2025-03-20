import { IToDoState } from './types';

const initialState: IToDoState = {
  actionProcessing: false,
  todos: [],
  sortOrder: {
    priority: null,
    category: null,
    sortBy: null,
    order: null,
    date: null,
    completed: null,
  },
};

export default initialState;
