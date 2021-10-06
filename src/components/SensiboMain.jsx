import * as React from "react";
import { useCallback } from "react";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SensiboCard from "./SensiboCard";
import { getUserACs, getACData } from "../lib/api";
import { grey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: { mode: "light", backgroundColor: grey[500] },
});

const SensiboMain = (props) => {
  const { APIKey } = props;
  const isMounted = useRef(false);
  const [ACList, setACList] = useState([]);

  const loadACs = useCallback(() => {
    return getUserACs(APIKey)
      .then((response) => {
        return response.map((item) => item.id);
      })
      .then((data) => {
        setACList(data);
      })
      .then((data) => {
        createACData(data, APIKey);
      })
      .catch((error) => {
        alert(error);
      });
  }, [APIKey]);

  useEffect(() => {
    isMounted.current = true;
    loadACs(APIKey);
    return () => {
      isMounted.current = false;
    };
  }, [APIKey, loadACs]);

  const createACData = async (data, APIKey) => {
    try {
      let newArray = [];
      if (data && data.length > 0) {
        data.forEach(async function (item) {
          const response2 = await getACData(APIKey, item);
          newArray.push(response2);
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid
          item
          // xs={12}
          key={index}
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 5,
                bgcolor: "backgroundColor",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 5,
              }}>
              {ACList.map((item) => (
                <SensiboCard key={item} id={item} APIKey={APIKey}></SensiboCard>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
};
export default SensiboMain;
