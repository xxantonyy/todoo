import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage по умолчанию

import Api from '@/api/Api';
import authReducer from '@/store/reducers/auth/authSlice';
import todosReducer from '@/store/reducers/toDo/toDoSlice';

const persistConfig = {
  key: 'root', // Ключ для хранилища
  storage, // Тип хранилища
  whitelist: ['auth'], // Список редьюсеров, которые нужно сохранять
  version: 1,
};

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: authReducer,
});

export const api = Api();

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: { api },
    },
    serializableCheck: false,
  }),

});

const persistor = persistStore(store); // Создаем persistor

export { rootReducer, store, persistor };
