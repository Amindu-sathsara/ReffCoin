// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { propertyApi } from '@/lib/api';

export const store = configureStore({
  reducer: {
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;