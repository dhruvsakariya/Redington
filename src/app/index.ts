import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';

import counterReducer, { CounterState } from '../features/counter/counterSlice';
import todoReducer, { TodoState } from '../store/todo/todoSlice';

// Actions
import actionCreators from '../store/action/index';

import { EmptyObject } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export interface AppState {
  counter: CounterState;
  todo: TodoState;
}

const blacklist = [''];

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  debug: false,
  blacklist,
};

const rootReducer = combineReducers<AppState>({
  counter: counterReducer,
  todo: todoReducer,
});

// Persisting All Slice
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: {
    trace: true,
    actionCreators,
  },
  // devTools: false,
  // enhancers: [composeWithDevTools({ realtime: true, port: 3000, actionCreators })()],
  middleware: (
    getDefaultMiddleware: CurriedGetDefaultMiddleware<
      EmptyObject & AppState & PersistPartial
    >
  ) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
