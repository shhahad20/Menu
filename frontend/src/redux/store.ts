import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu/menuSlice';
import itemsReducer from './menu/itemSlice';
import authReducer from './slices/authSlice';
const store = configureStore({
    reducer: {
      menu: menuReducer,
      items: itemsReducer,
      users: authReducer,
    },
  });
  
  // Define RootState based on the store's state
  export type RootState = ReturnType<typeof store.getState>;
  
  // Define AppDispatch based on the store's dispatch
  export type AppDispatch = typeof store.dispatch;
export default store;
