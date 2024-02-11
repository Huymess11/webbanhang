import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slide/counterSlice'
import userReducer from './slide/userSlide'

export const store = configureStore({
  reducer: {
    product: counterReducer,
    user: userReducer
  },
})
