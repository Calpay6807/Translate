import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
 ? bu method bizden iki parametre ister
 * 1- methodun görevini tanımlayan string değer
 * 2- bir fonksiyon
 * > > bu fonksiyon async işlemler yapar (veritabanı sorguları)
 * > > api'dan gelen cevabı store'a aktarmak için return  
*/
export const getUsers = createAsyncThunk("getUsers", async () => {
  // asenkron işlemler burada yapılır
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  // store'a aktarmak istediğimiz değerler return edilir
  return res.data;
});

const initialState = {
  users: [],
  isError: false,
  isLoading: true,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  //* thunk'aksiyonları ele almak için reducers yerine extraReducers kullanılır
  extraReducers: {
    //* henüz api'dan cevap gelmediyse state'i günceller
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },

    //* eğer api'dan gelen cevap olumluysa:
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },

    //* eğer api'den gelen cevap olumsuzsa:
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default testSlice.reducer;
