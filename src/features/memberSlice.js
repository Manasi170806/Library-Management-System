import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Thunk for fetching members
export const fetchMembers = createAsyncThunk("members/fetch", async () => {
  const res = await axios.get("http://localhost:3000/members");
  return res.data;
});

// 🔹 Thunk for deleting a member
export const deleteMember = createAsyncThunk("members/delete", async (id) => {
  await axios.delete(`http://localhost:3000/members/${id}`);
  return id;
});

// 🔹 Thunk for adding a member
export const addMember = createAsyncThunk("members/add", async (newMember) => {
  const res = await axios.post("http://localhost:3000/members", newMember);
  return res.data;
});

// 🔹 Thunk for updating a member
export const updateMember = createAsyncThunk(
  "members/update",
  async (updatedMember) => {
    const res = await axios.put(
      `http://localhost:3000/members/${updatedMember.id}`,
      updatedMember
    );
    return res.data;
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
      // Fetch
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

      // Delete
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.list = state.list.filter((m) => m.id !== action.payload);
      })

      // Add
      .addCase(addMember.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.list.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const selectMembers = (state) => state.members.list;
export default memberSlice.reducer;
