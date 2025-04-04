import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { IPartialTodoResponseConverted, ITodoResponseConverted } from '@/api/TodoApi/types';
import { getNotify } from '@/components/Notify/Notify';
import { store } from '@/store/store';
import { TAppThunkAPI } from '@/store/types';

import initialState from './initial';
import { EToDoActionDataTypes, IToDoPayload } from './types';

const getTodos = createAsyncThunk<
  { todos: ITodoResponseConverted[] | null },
  { data?: IToDoPayload },
  TAppThunkAPI
>(
  EToDoActionDataTypes.GET_TODOS,
  async (data, thunkAPI) => {
    const { getState, extra: { api } } = thunkAPI;
    const state = getState();
    const response = await api.toDo.getTodos(state.auth.token, data.data);

    if (response.success) {
      return {
        todos: response.data,
      };
    }
    const presistState = persistStore(store);
    await presistState.purge();
    getNotify(`Произошла ошибка при получении задач ${response.error}`, 'error', 5000);
    return {
      todos: null,
    };
  },
);

const updateTodo = createAsyncThunk<
  void,
  {
    item: IPartialTodoResponseConverted,
    callback?:(
    ) => void,
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.UPDATE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.patchToDo(body.item, state.auth.token);

    if (response.success) {
      getNotify('Задача обновлена', 'success');
      if (body.callback) body.callback();
      dispatch(getTodos({ data: thunkAPI.getState().todos.sortOrder }));
    } else {
      getNotify(`Произошла ошибка при обновлении задачи ${response.error}`, 'error', 5000);
    }
  },
);

const createTodo = createAsyncThunk<
  void,
  {
    item: IPartialTodoResponseConverted,
    callback:(
    ) => void,
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.CREATE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.createTodo(body.item, state.auth.token);

    if (response.success) {
      getNotify('Задача успешно создана!', 'success');
      dispatch(getTodos({}));
      if (body.callback) body.callback();
    } else {
      getNotify(`Произошла ошибка при создании задачи ${response.error}`, 'error', 5000);
    }
  },
);

const deleteTodo = createAsyncThunk<
  void,
  {
    id: string,
    callback:(
    ) => void
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.DELETE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.deleteTask({ todoId: body.id }, state.auth.token);

    if (response.success) {
      getNotify('Задача успешно удалена!', 'success');
      if (body.callback) body.callback();
      dispatch(getTodos({}));
    } else {
      getNotify(`Произошла ошибка при удалении задачи ${response.error}`, 'error', 5000);
    }
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeSortOrder: (
      state,
      action: PayloadAction<{ key?: keyof IToDoPayload; value?: IToDoPayload; all?: boolean }>,
    ) => {
      if (action.payload.all) {
        state.sortOrder = {
          priority: null, category: null, sortBy: null, order: null, date: null, completed: null,
        };
      }
      state.sortOrder = {
        ...state.sortOrder,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    // getTodos
    builder.addCase(getTodos.pending, (state) => {
      state.actionProcessing = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload?.todos;
      state.actionProcessing = false;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.todos = null;
      state.actionProcessing = false;
    });

    // updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.actionProcessing = true;
    });
    builder.addCase(updateTodo.fulfilled, (state) => {
      state.actionProcessing = false;
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.actionProcessing = false;
    });

    // createTodo
    builder.addCase(createTodo.pending, (state) => {
      state.actionProcessing = true;
    });
    builder.addCase(createTodo.fulfilled, (state) => {
      state.actionProcessing = false;
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.actionProcessing = false;
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.actionProcessing = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.actionProcessing = false;
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.actionProcessing = false;
    });
  },
});

const actions = {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
};

export const todosActions = { ...todosSlice.actions, ...actions };
export default todosSlice.reducer;
