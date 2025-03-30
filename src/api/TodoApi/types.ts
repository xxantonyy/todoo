export interface ITodoResponse {
  _id: string;
  __v: number;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  category: number;
  priority: number;
  date: string;
}

export interface ITodoResponseConverted {
  id: string;
  title: string;
  description: string;
  category: number;
  priority: number;
  completed: boolean;
  date: string;
}
export interface IPartialTodoResponseConverted extends Partial<ITodoResponseConverted> {}

export interface ICreateTaskResponse {
  data: ITodoResponse,
  message: string,
  success: boolean,
}

export interface IDeleteTaskPayload {
  todoId: string,
}
