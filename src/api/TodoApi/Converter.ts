import { ICreateTaskResponse, ITodoResponse, ITodoResponseConverted } from "./types";

export const Converter = () => {
  const convertToDos = (data: ITodoResponse[]): ITodoResponseConverted[] => {
    return data.map(item => {
      return {
        id: item._id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        category: item.category,
        priority: item.priority,
        date: item.date
      }
    })
  }

  const convertToDo = (data: ICreateTaskResponse): ITodoResponseConverted => {
    return {
      id: data.data._id,
      title: data.data.title,
      description: data.data.description,
      completed: data.data.completed,
      category: data.data.category,
      priority: data.data.priority,
      date: data.data.date
    }
  }


  return {
    convertToDos,
    convertToDo,
  }
}