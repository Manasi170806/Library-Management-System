// src/features/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for fetching books from json-server
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:3000/books"); // <-- yaha API hit hoga
  return response.data;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector
export const selectBooks = (state) => state.books.list;

export default booksSlice.reducer;
