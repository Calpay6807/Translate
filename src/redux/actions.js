import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../helper/constant/index";
import axios from "axios";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    //asenkron işlemler
    const res = await axios.get(
      "https://text-translator2.p.rapidapi.com/getLanguages",
      options
    );
    const language = res.data.data.languages;

    /* diziyi dönüp bütün code keylerini valueye çevirir
    bütün name keylerini labela çevirir
    */
    const newLanguages = language.map((lang) => ({
      label: lang.name,
      value: lang.code,
    }));
    console.log("newlanguages", newLanguages);
    // stora gönderilecek değeri return eder
    return newLanguages;
  }
);

// çeviri yapmak için

export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (props) => {
    // istek için gerekl, olan ayarlar
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.source.value);
    encodedParams.set("target_language", props.targetLength.value);
    encodedParams.set("text", props.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "31813c5257msh28e01fc36580c46p1d37b9jsn21224371fef2",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };
    // isteği yapma
    const res = await axios.request(options);
    const answer = res.data.data.translatedText;
    return answer;
  }
);
