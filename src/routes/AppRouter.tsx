import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { privateRoutes, publicRoutes } from './routrer';

export const AppRouter = memo(() => {
  const { auth } = useTypedSelector((state) => state.auth);
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      {auth && privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
});
