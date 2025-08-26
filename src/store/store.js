import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/booksSlice";
import membersReducer from "../features/memberSlice";
// import navigationReducer from "../features/navigationSlice";



export const store = configureStore({
  reducer: {
    books: booksReducer,
    members: membersReducer,
    // navigation: navigationReducer
  },
});