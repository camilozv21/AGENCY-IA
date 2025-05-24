import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/user';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      user: userSlice
    }),
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']