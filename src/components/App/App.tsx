import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from '@/routes/AppRouter';
import { classNames } from '@/shared/classNames/classNames';
import { ThemeProvider } from '@/shared/ThemeProvider/ThemeProvider';
import { persistor, store } from '@/store/store';
import { Loading } from '@/widgets/Loading/Loading';

import Header from '../Header/Header';
import Notify from '../Notify/Notify';

import './App.module.scss';
import '@/assets/styles.scss';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Notify />
        <div className={classNames('container', {}, [])}>
          <BrowserRouter>
            <Header />
            <div className={classNames('content', {}, [])}>
              <Suspense fallback={<Loading />}>
                <AppRouter />
              </Suspense>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
