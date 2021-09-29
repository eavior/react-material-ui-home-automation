import React from "react";
import { useEffect, useState, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import {
  AppBar,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { green, orange } from "@mui/material/colors";
import "fontsource-roboto";
import { getUserACs } from "../lib/api";

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

function MUIexamples() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div className="App">
          <header className="App-header">
            <AppBar color="primary">
              <Toolbar>
                <IconButton>
                  <MenuIcon></MenuIcon>
                </IconButton>
                <Typography variant="h6">MUI Themeing</Typography>
                <Button color="secondary">Login</Button>
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
          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default MUIexamples;
