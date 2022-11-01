import {
  Badge,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

const App = () => {
  const [textInput, setTextInput] = useState("");
  const [pldResult, setPldResult] = useState([]);

  const getPalindromic = (text) => {
    let results = [];
    const splitText = text
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, "")
      .split("");

    splitText.forEach((el, index) => {
      for (let i = splitText.length - 1; i > 0; i--) {
        if (el === splitText[i]) {
          const sliceText = splitText.slice(index, i + 1);

          const nSliceText = [...sliceText].join("");
          const rSliceText = [...sliceText].reverse().join("");

          if (nSliceText === rSliceText && nSliceText.length > 1) {
            results.push(nSliceText);
          }
        }
      }
    });

    const sortRes = results.sort((a, b) => b.length - a.length);

    const uniqRes = [...new Set(sortRes)];

    setPldResult(uniqRes);
  };

  const onHandleInput = (ev) => {
    const { value } = ev.target;
    setTextInput(value);

    getPalindromic(value);
  };

  return (
    <Box sx={{ background: "#F6F6F6" }}>
      <Container>
        <Stack
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3">Palindromic Search</Typography>
          <TextField
            label="Please input some palindromic eg. banana"
            variant="outlined"
            fullWidth
            value={textInput}
            onChange={onHandleInput}
          />

          <Paper
            elevation={3}
            sx={{
              height: "60vh",
              minHeight: "400px",
              padding: "25px",
              width: "100%",
              marginTop: "20px",
              overflow: "auto",
            }}
          >
            <Grid container spacing={3} wrap="wrap">
              {!!pldResult.length &&
                pldResult.map((el, elIndex) => {
                  return (
                    <Grid
                      item
                      key={elIndex}
                      xs={elIndex === 0 && 12}
                      textAlign={elIndex === 0 && "center"}
                    >
                      <Badge badgeContent={el.length}>
                        <Typography variant={elIndex === 0 ? "h2" : "h4"}>
                          {el}
                        </Typography>
                      </Badge>
                    </Grid>
                  );
                })}
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
