import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Box,
  FormControl,
  Grid,
  TextareaAutosize,
  Typography,
  colors,
} from "@mui/material";
import { getAnswer, getLanguages } from "../../redux/actions";
import { clearAnswer } from "../../redux/translateSlice";

const MainPage = () => {
  const [text, setText] = useState("");
  const [source, setSource] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLength, setTargetLength] = useState({
    value: "en",
    label: "English",
  });
  console.log(source, targetLength);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const areaRef = useRef();
  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  //stateler arası değişim yapar
  const handleClick = () => {
    // diğerinin değerini diğerine atıyacağız

    setSource(targetLength);
    setTargetLength(source);
    dispatch(clearAnswer());
    areaRef.current.value = "";
  };
  return (
    <>
      <Typography
        sx={{ textAlign: "center", color: "white", marginTop: "15px" }}
        variant="h1"
        component="h2"
      >
        Çeviri
      </Typography>
      ;
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          gap: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ boxShadow: 3 }}>
          <FormControl fullWidth>
            <Select
              isLoading={state.isLoading}
              isDisabled={state.isLoading}
              value={source}
              onChange={(e) => setSource(e.value)}
              options={state.language}
            />
            <TextareaAutosize
              ref={areaRef}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button onClick={handleClick} sx={{ boxShadow: 3 }} variant="contained">
          Değiştir
        </Button>
        <Box sx={{ boxShadow: 3 }}>
          <FormControl fullWidth>
            <Select
              value={targetLength}
              onChange={(e) => setTargetLength(e)}
              options={state.language}
            />

            <TextareaAutosize ref={areaRef} disabled value={state.answer} />
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => dispatch(getAnswer({ text, source, targetLength }))}
          sx={{ width: "40%" }}
          variant="contained"
        >
          Çevir
        </Button>
      </Box>
    </>
  );
};

export default MainPage;
