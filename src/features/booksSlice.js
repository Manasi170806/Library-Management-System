import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: []   // ✅ empty array default
  },
  reducers: {
    setBooks: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export const selectBooks = (state) => state.books.items;
export default booksSlice.reducer;
