"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AutomationReducer from "./slices/automation";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  AutomationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
