import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:3000/books");
  return response.data;
});
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    return id;
  }
);


export const issuedBooks = createAsyncThunk("books/issuedBooks", async () => {
  const response = await axios.get("http://localhost:3000/issued");
  return response.data;
});

export const reservedBooks = createAsyncThunk(
  "books/reservedBooks",
  async () => {
    const response = await axios.get("http://localhost:3000/reservation");
    return response.data;
  }
);

export const fines = createAsyncThunk("books/finesBooks", async () => {
  const response = await axios.get("http://localhost:3000/fines");
  return response.data;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    total: [],
    issued: [],
    reservation: [],
    fines: [],
    status: {
      total: "idle",
      issue: "idle",
      reservation: "idle",
      fines: "idle",
    },
    error: {
      total: null,
      issue: null,
      reservation: null,
      fines: null,
    },
  },
  reducers: {
  
},

  

  extraReducers: (builder) => {
    
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status.total = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status.total = "succeeded";
        state.total = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status.total = "failed";
        state.error.total = action.error.message;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
  state.total = state.total.filter((book) => book.id !== String(action.payload));
});

    // issued
    builder
      .addCase(issuedBooks.pending, (state) => {
        state.status.issue = "loading";
      })
      .addCase(issuedBooks.fulfilled, (state, action) => {
        state.status.issue = "succeeded";
        state.issued = action.payload;
      })
      .addCase(issuedBooks.rejected, (state, action) => {
        state.status.issue = "failed";
        state.error = action.error.message;
      });

    // reservation
    builder
      .addCase(reservedBooks.pending, (state) => {
        state.status.reservation = "loading";
      })
      .addCase(reservedBooks.fulfilled, (state, action) => {
        state.status.reservation = "succeeded";
        state.reservation = action.payload;
      })
      .addCase(reservedBooks.rejected, (state, action) => {
        state.status.reservation = "failed";
        state.error.reservation = action.error.message;
      });

    // fines
    builder
      .addCase(fines.pending, (state) => {
        state.status.fines = "loading";
      })
      .addCase(fines.fulfilled, (state, action) => {
        state.status.fines = "succeeded";
        state.fines = action.payload;
      })
      .addCase(fines.rejected, (state, action) => {
        state.status.fines = "failed";
        state.error.fines = action.error.message;
      });
  },
});

export const selectBooks = (state) => state.books.total;
export const selectIssued = (state) => state.books.issued;
export const selectReserved = (state) => state.books.reservation;
export const selectFines = (state) => state.books.fines;
export const { removeBook } = booksSlice.actions;


export default booksSlice.reducer;
