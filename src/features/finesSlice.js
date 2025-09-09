import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// If you're running json-server (npm run json-server --watch db.json --port 3000)
// then fetch fines from API:
export const fetchFines = createAsyncThunk("fines/fetchFines", async () => {
  const res = await fetch("http://localhost:3000/fines");
  const data = await res.json();

  // calculate fines dynamically
  const finePerDay = 10; // ₹10/day late

  const updated = data.map((f) => {
    let fineAmount = f.fineAmount;

    if (f.returnDate) {
      const due = new Date(f.dueDate);
      const returned = new Date(f.returnDate);
      const daysLate = Math.max(
        0,
        Math.ceil((returned - due) / (1000 * 60 * 60 * 24))
      );
      fineAmount = daysLate * finePerDay;
    }

    return { ...f, fineAmount };
  });

  return updated;
});

const finesSlice = createSlice({
  name: "fines",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    markPaid: (state, action) => {
      const fine = state.items.find((f) => f.id === action.payload);
      if (fine) {
        fine.paymentStatus = "Paid";
      }
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
