import { createSlice } from "@reduxjs/toolkit";
import { getAnswer, getLanguages } from "./actions";

const initialState = {
  translate: [],
  answer: "",
  isLoading: true,
  isError: false,
};
const translateSlice = createSlice({
  name: "translate",
  initialState,
  // thunkta reducers yerine extraReducers kullanılır
  extraReducers: {
    //* henüz api'dan cevap gelmediyse state'i günceller
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },

    //* eğer api'dan gelen cevap olumluysa:

    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.language = action.payload;
    },
    //* eğer api'den gelen cevap olumsuzsa:

    [getLanguages.rejected]: (state, action) => {
      state.isLoading = false;

      state.isError = "diller alinirken hata oluştu";
    },
    // çeviri isteklerini yönetme
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },

    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.answer = action.payload;
    },
    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
      state.isError = "hata oluştu";
    },
  },
  //normal aksiyon
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});
export const { clearAnswer } = translateSlice.actions;
export default translateSlice.reducer;
