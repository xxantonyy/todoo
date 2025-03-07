import BaseAPI from "../BaseApi"
import { EQueryTypes } from "../types";
import { IAuthApi } from "./types";

const AuthApi = () => {
  const api = BaseAPI("http://31.130.150.4:3000/");

  const auth = (username: string, password: string) =>
    api.sendQuery<IAuthApi, IAuthApi>({
      type: EQueryTypes.POST,
      url: '/auth/login',
      params: {
        username,
        password
      },
      options: {},
      converterSuccess: data => data,
    })

  return {
    auth,
  }
}

export default AuthApi;