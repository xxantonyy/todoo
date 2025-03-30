import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { authActions } from '@/store/reducers/auth/authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    login: '',
    password: '',
  });

  const dispatch = useTypedDispatch();

  const onChangeValue = useCallback((value: string, key: string) => {
    setValues({
      ...values,
      [key]: value,
    });
  }, [values]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Форма отправлена');
    dispatch(authActions.getAuth({
      username: values.login,
      password: values.password,
      callback: () => { setOpen(false); setValues({ login: '', password: '' }); navigate('/calendar'); },
    }));
  }, [dispatch, navigate, values]);

  const disabled = !values.login || !values.password;

  return {
    values,
    open,
    onSubmit,
    setOpen,
    onChangeValue,
    disabled,
  };
};

export default useAuth;
