import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { authActions } from "@/store/reducers/auth/authSlice";
import { useCallback, useState } from "react";

const useAuth = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    login: '',
    password: '',
  })

  const dispatch = useTypedDispatch();

  const onChangeValue = useCallback((value: string, key: string) => {
    setValues({
      ...values,
      [key]: value
    })
  }, [values]);

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    dispatch(authActions.getAuth({
      username: values.login,
      password: values.password,
      callback: () => { setOpen(false); setValues({ login: '', password: '' }) }
    }))
  }, [dispatch, values]);

  return {
    values,
    open,
    onSubmit,
    setOpen,
    onChangeValue,
  }
};

export default useAuth;