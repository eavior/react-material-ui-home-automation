import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import SensiboCard from "./SensiboCard";
import { getUserACs } from "../lib/api";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const data = [];

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export default function SensiboMain() {
  const isMounted = useRef(false);
  const [ACList, setACList] = useState({});

  useEffect(() => {
    isMounted.current = true;
    loadACs();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadACs = async () => {
    try {
      const userACs = await getUserACs();
      // console.log(userACs);
      setACList(userACs);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid
          item
          xs={12}
          key={index}
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 1,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 2,
              }}>
              {ACList.map((id) => (
                <SensiboCard key={id} id={id}></SensiboCard>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
