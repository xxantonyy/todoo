import { ITodoResponseConverted } from '@/api/TodoApi/types';
import { IAction, IActionData } from '@/store/types';

export enum EToDoActionDataTypes {
  GET_TODOS = 'todos/GET_TODOS',
  UPDATE_TODO = 'todos/UPDATE_TODO',
  CREATE_TODO = 'todos/CREATE_TODO',
  DELETE_TODO = 'todos/DELETE_TODO',
}

export interface IToDoPayload {
  priority?: number | null,
  category?: number | null,
  sortBy?: 'priority' | 'category' | 'date' | 'completed' | null,
  order?: 'desc' | 'asc' | null,
  date?: string | null,
  completed?: number | null,
}

export interface IToDoState {
  actionProcessing: boolean;
  todos: ITodoResponseConverted[];
  sortOrder: IToDoPayload;
}

export type TToDoPagesPayload = {
  [EToDoActionDataTypes.GET_TODOS]?: {
    todos: ITodoResponseConverted[];
  };
}

export interface IToDoAction<TArgs> extends IAction<EToDoActionDataTypes, TToDoPagesPayload, TArgs> { }
export interface IToDosActionData extends IActionData<EToDoActionDataTypes, TToDoPagesPayload> { }
