import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/booksSlice";
import membersReducer from "../features/memberSlice";


export const store = configureStore({
  reducer: {
    books: booksReducer,
    members: membersReducer,
  },
});
