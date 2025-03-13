import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ Uses localStorage for persistence
import createWebStorage from "redux-persist/lib/storage/createWebStorage"; // ✅ Fallback for SSR
import authReducer from "./slice/authSlice"; // ✅ Import auth slice

// ✅ Prevent SSR crash by providing an empty storage fallback
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storageFallback = typeof window !== "undefined" ? storage : createNoopStorage();

// ✅ Persist Config (Only persist authReducer)
const persistConfig = {
  key: "auth",
  storage: storageFallback, // ✅ Use fallback storage for SSR
};

// const rootReducer = combineReducers({
//   auth: persistReducer(persistConfig, authReducer), // ✅ Persist only auth
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== "production", // ✅ Enable Redux DevTools
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // ✅ Ignore serialization check for redux-persist
//     }),
// });

// export const persistor = persistStore(store); // ✅ Persistor for persistence

// // ✅ Export types for Redux usage
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;










// --------------------

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer, // ✅ Persist only auth
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Ignore serialization check for redux-persist
    }),
});

export const persistor = persistStore(store); // ✅ Persistor for clearing auth data

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;