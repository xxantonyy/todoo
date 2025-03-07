import AuthApi from "./AuthApi/AuthApi";
import TodoApi from "./TodoApi/TodoApi";

const Api = () => {
  const toDo = TodoApi();
  const auth = AuthApi();


  return {
    auth,
    toDo,
  }
}

export default Api;