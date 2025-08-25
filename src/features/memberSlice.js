import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Members ko fetch karne ka thunk
export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  const response = await axios.get("http://localhost:3000/member"); 
  return response.data;
});

const membersSlice = createSlice({
  name: "members",
  initialState: {
    list: [],
    status: "idle",
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

// ✅ Selector export
export const selectMembers = (state) => state.members.list;

export default membersSlice.reducer;
