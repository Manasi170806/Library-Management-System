import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 API se fetch karne ka thunk
export const fetchFines = createAsyncThunk("fines/fetchFines", async () => {
  const res = await fetch("http://localhost:3000/fines"); // <-- apna json-server link
  const data = await res.json();
  return data;
});

const finesSlice = createSlice({
  name: "fines",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    markPaid: (state, action) => {
      const fine = state.items.find((f) => f.id === action.payload);
      if (fine) fine.paymentStatus = "Paid";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFines.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFines.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { markPaid } = finesSlice.actions;
export default finesSlice.reducer;
