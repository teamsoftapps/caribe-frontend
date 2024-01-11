/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  token: null,
  isLoggedin: false,
  isloading: false,
  id: null,
  error: null,
  res_Id: null,
  userName: null,
  email: null,
};
const BackendUrl = "http://localhost:5000/api/v2/auth";

export const login = createAsyncThunk("auth", async (body) => {
  try {
    const response = await axios.post(`${BackendUrl}/login`, body);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setforgetid: (state, action) => {
      state.res_Id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isloading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload?.data?.bearertoken;
        state.id = action.payload?.data?._id;
        state.isloading = false;
        state.isLoggedin = true;
        state.error = action.payload?.Error;
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.isLoggedin = false;
      });
  },
});

export const { extraReducers, setforgetid, setEmail, setUserName } =
  authSlice.actions;
export default authSlice.reducer;
