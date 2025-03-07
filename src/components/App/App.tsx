import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from '@/routes/AppRouter';
import { Loading } from '@/widgets/Loading/Loading';
import { store, persistor } from '@/store/store';
import { classNames } from '@/shared/classNames/classNames';
import { ThemeProvider } from '@/shared/ThemeProvider/ThemeProvider';

import cls from './App.module.scss';
import Header from '../Header/Header';
import Notify from '../Notify/Notify';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Notify />
        <div className={classNames(cls.container, {}, [])}>
          <BrowserRouter>
            <Header />
            <Suspense fallback={<Loading />}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
