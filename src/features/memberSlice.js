import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Members fetch karne ka thunk
export const fetchMembers = createAsyncThunk("members/fetch", async () => {
  const res = await axios.get("http://localhost:3000/member");
  return res.data;
});

const memberSlice = createSlice({
  name: "members",
  initialState: {
    list: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Selector
export const selectMembers = (state) => state.members.list;

export default memberSlice.reducer;
