import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching members
export const fetchMembers = createAsyncThunk("members/fetch", async () => {
  const res = await axios.get("http://localhost:3000/members");
  return res.data;
});

// Thunk for deleting a member
export const deleteMember = createAsyncThunk("members/delete", async (id) => {
  await axios.delete(`http://localhost:3000/members/${String(id)}`);

  return id;
});

// add member

export const addMember = createAsyncThunk(
  "members/addMember",
  async (newMember) => {
    const response = await axios.post(
      "http://localhost:3000/members",
      newMember
    );
    return response.data;
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
        state.list = state.list.filter((m) => m.id !== action.payload);
      })
      // add member
      .addCase(addMember.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const selectMembers = (state) => state.members.list;

export default memberSlice.reducer;
