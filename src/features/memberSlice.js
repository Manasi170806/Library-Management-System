import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching members
export const fetchMembers = createAsyncThunk("members/fetch", async () => {
  const res = await axios.get("http://localhost:3000/members");
  return res.data;
});

// Thunk for deleting a member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async (id) => {
    await axios.delete(`http://localhost:3000/members/${String(id)}`);

    return id; // id ko wapas bhejna zaruri hai
  }
);

const memberSlice = createSlice({
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
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
    state.list = state.list.filter(m => m.id !== action.payload);
  });
  },
});

// ✅ selector
export const selectMembers = (state) => state.members.list;

export default memberSlice.reducer;
