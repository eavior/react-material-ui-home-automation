import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import SensiboCard from "./SensiboCard";
import { getUserACs, getACData } from "../lib/api";

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

// const Greeting = React.memo((props) => {
//   console.log("Greeting Comp render");
//   return <h1>Hi {props.name}!</h1>;
// });

// const Greeting = (props) => {
//   console.log("Greeting Comp render");
//   return <h1>Hi {props.name}!</h1>;
// };

const SensiboMain = React.memo((props) => {
  const isMounted = useRef(false);
  const [ACList, setACList] = useState([]);
  const [ACList2, setACList2] = useState([1]);

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
      const AcList = await userACs.map((item) => item.id);
      setACList(AcList);
      await createAcData();
    } catch (error) {
      alert(error);
    }
  };

  const createAcData = async () => {
    try {
      let newArray = [];
      console.log(ACList.length);
      if (ACList.length > 0) {
        ACList.forEach(async function (item) {
          const response2 = await getACData(item);
          // console.log(response2);

          newArray.push(response2);
        });
      }
      console.log(newArray);
      setACList2(newArray);
      console.log(newArray);
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
              {ACList.map((item) => (
                <SensiboCard key={item} id={item}></SensiboCard>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
});
export default SensiboMain;
