import React from "react";
import { useEffect, useState, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
// import Button from "@mui/material/Button";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";

import { getUserACs } from "../lib/api";
import ACItem from "./ACItem";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    border: 0,
    borderRadius: 15,
    marginBottom: 15,
    color: "white",
    padding: "5px 30px",
  },
});

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: orange[500],
    },
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return (
    <Button className={classes.root} onClick={this}>
      Test styled Button
    </Button>
  );
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          // color="primary"
          icon={<SaveIcon />}
          checkedIcon={<SaveIcon />}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      }
      label="Testing checkbox"
    />
  );
}

function SensiboMain() {
  const isMounted = useRef(false);
  const [ACList, setACList] = React.useState({});

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
      console.log(userACs);
      setACList(userACs);
    } catch (error) {
      alert(error);
    }
  };

  // const allACs =
  //   ACList.length < 1 ? (
  //     <div>There are no ACs in the list</div>
  //   ) : (
  //     <div className="row row-cols-1 row-cols-md-auto g-4">
  //       {ACList.map((item) => {
  //         return (
  //           <ACItem
  //             key={item.id}
  //             item={item}
  //             // onLoadACs={() => onLoadACs()}
  //           />
  //         );
  //       })}
  //     </div>
  //   );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div className="App">
          <header className="App-header">
            <AppBar color="secondary">
              <Toolbar>
                <IconButton>
                  <MenuIcon></MenuIcon>
                </IconButton>
                <Typography variant="h6">MUI Themeing</Typography>
                <Button>Login</Button>
              </Toolbar>
            </AppBar>
            <Typography variant="h2">Welcome to MUI</Typography>
            <Typography variant="subtitle1" component="div">
              Learn how to use MUI
            </Typography>
            <ButtonStyled />
            <TextField
              variant="filled"
              color="secondary"
              type="time"
              label="The time"
              placeholder="19:00"
            />
            <CheckboxExample />
            <ButtonGroup>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                color="primary"
                style={{ fontSize: 20 }}>
                Save
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="primary"
                style={{ fontSize: 20 }}>
                Discard
              </Button>
            </ButtonGroup>
            <Grid container spacing={4} justify="center">
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>

              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>

              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>
            </Grid>

            <img src={logo} className="App-logo" alt="logo" />

            {/* <div>{allACs}</div> */}
          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default SensiboMain;
