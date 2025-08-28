
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  const response = await axios.get("http://localhost:3000/members");
  return response.data;
});



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


