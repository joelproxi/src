import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Could not load state', err);
      return undefined;
    }
  };
  

  const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  };

  const persistedState = loadState();

const store = configureStore({reducer: {
    auth: authReducer,
}},);

store.subscribe(() => {
saveState(store.getState().auth);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;