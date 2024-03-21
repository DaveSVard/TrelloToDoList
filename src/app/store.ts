import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import toDoReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toDo: toDoReducer,
    users: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
