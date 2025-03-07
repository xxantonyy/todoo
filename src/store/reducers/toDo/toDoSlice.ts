import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAppThunkAPI } from '@/store/types';
import initialState from "./initial";
import { persistStore } from 'redux-persist';
import { EToDoActionDataTypes } from "./types";
import { IPartialTodoResponseConverted, ITodoResponseConverted } from "@/api/TodoApi/types";
import { store } from "@/store/store";
import { getNotify } from "@/components/Notify/Notify";

const getTodos = createAsyncThunk<
  { todos: ITodoResponseConverted[] | null },
  void,
  TAppThunkAPI
>(
  EToDoActionDataTypes.GET_TODOS,
  async (_, thunkAPI) => {
    const { getState, extra: { api } } = thunkAPI;
    const state = getState();
    const response = await api.toDo.getTodos(state.auth.token);

    if (response.success) {
      return {
        todos: response.data,
      }
    } else {
      const presistState = persistStore(store);
      await presistState.purge();
      console.error(`error in ${EToDoActionDataTypes.GET_TODOS}, message: ${response.errorMessage}`);
    }

  }
)

const updateTodo = createAsyncThunk<
  void,
  {
    item: IPartialTodoResponseConverted,
    callback?: () => void,
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.UPDATE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.patchToDo(body.item, state.auth.token);

    if (response.success) {
      getNotify('Задача обновлена', "success");
      if(body.callback) body.callback();
      dispatch(getTodos());
    } else {
      console.error(`error in ${EToDoActionDataTypes.UPDATE_TODO}, message: ${response.errorMessage}`);
    }
  }
)

const createTodo = createAsyncThunk<
  void,
  {
    item: IPartialTodoResponseConverted,
    callback: () => void,
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.CREATE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.createTodo(body.item, state.auth.token);

    if (response.success) {
      getNotify('Задача успешно создана!', "success");
      dispatch(getTodos());
      if(body.callback) body.callback();
    } else {
      console.error(`error in ${EToDoActionDataTypes.CREATE_TODO}, message: ${response.errorMessage}`);
    }
  }
)

const deleteTodo = createAsyncThunk<
  void,
  {
    id: string,
    callback: () => void
  },
  TAppThunkAPI
>(
  EToDoActionDataTypes.DELETE_TODO,
  async (body, thunkAPI) => {
    const { getState, extra: { api }, dispatch } = thunkAPI;
    const state = getState();

    const response = await api.toDo.deleteTask({ todoId: body.id }, state.auth.token);

    if (response.success) {
      getNotify('Задача успешно удалена!', "success");
      if(body.callback) body.callback();
      dispatch(getTodos());
    } else {
      console.error(`error in ${EToDoActionDataTypes.DELETE_TODO}, message: ${response.errorMessage}`);
    }
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    // getTodos
    builder.addCase(getTodos.pending, (state, action) => {
      state.actionProcessing = true
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload?.todos
      state.actionProcessing = false
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.todos = null
      state.actionProcessing = false
    });
    

    // updateTodo
    builder.addCase(updateTodo.pending, (state, action) => {
      state.actionProcessing = true
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.actionProcessing = false
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.actionProcessing = false
    });

    // createTodo
    builder.addCase(createTodo.pending, (state, action) => {
      state.actionProcessing = true
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.actionProcessing = false
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.actionProcessing = false
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.actionProcessing = true
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.actionProcessing = false
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.actionProcessing = false
    });
  },
});

const actions = {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
}

export const todosActions = { ...todosSlice.actions, ...actions }
export default todosSlice.reducer;