import { IToDoPayload } from "@/store/reducers/toDo/types";
import BaseAPI from "../BaseApi"
import { EQueryTypes } from "../types";
import { Converter } from "./Converter";
import { ICreateTaskResponse, IDeleteTaskPayload, IPartialTodoResponseConverted, ITodoResponse, ITodoResponseConverted } from "./types";

const API_URL = __API__ || "http://31.130.150.4:3000/";

const TodoApi = () => {
  const api = BaseAPI(API_URL);
  const converter = Converter();

  const getTodos = (authToken: string, data?: IToDoPayload) =>
    api.sendQuery<ITodoResponse[], ITodoResponseConverted[]>({
      type: EQueryTypes.GET,
      url: '/todos',
      params: {
        ...data,
      },
      options: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      },
      converterSuccess: data => converter.convertToDos(data),
    })

  const patchToDo = (body: IPartialTodoResponseConverted, authToken: string) =>
    api.sendQuery<object, object>({
      type: EQueryTypes.PUT,
      url: `/todos/${body.id}`,
      params: {
        title: body.title,
        description: body.description,
        category: body.category,
        priority: body.priority,
        completed: body.completed,
        date: body?.date || new Date(),
      },
      options: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      },
    })

  const createTodo = (body: IPartialTodoResponseConverted, authToken: string) =>
    api.sendQuery<ICreateTaskResponse, ITodoResponseConverted>({
      type: EQueryTypes.POST,
      url: '/todos',
      params: {
        title: body.title,
        description: body.description,
        category: body.category,
        priority: body.priority,
        completed: body.completed,
        date: new Date(),
      },
      options: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      },
      converterSuccess: data => converter.convertToDo(data),
    })

  const deleteTask = (body: IDeleteTaskPayload, authToken: string) =>
    api.sendQuery<object, object>({
      type: EQueryTypes.DELETE,
      url: `/todos/${body.todoId}`,
      params: {
        ...body
      },
      options: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      },
    })

  return {
    getTodos,
    patchToDo,
    createTodo,
    deleteTask,
  }
}

export default TodoApi