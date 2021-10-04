import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import {
  deepOrange,
  yellow,
  orange,
  green,
  blue,
  red,
  grey,
} from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Icon } from "@iconify/react";

import Grid from "@mui/material/Grid";

import { getACData, changeAcState } from "../lib/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 20,
    },
  },
  yellowPaper: {
    backgroundColor: orange[300],
  },

  palette: {
    primary: {
      main: green[400],
      backgroundColor: orange[400],
      color: grey[100],
      "&:hover": {
        backgroundColor: "#FF9A3E",
      },
    },

    secondary: {
      main: orange[500],
    },
    grey: {
      main: grey[700],
    },
    blue: {
      main: blue[400],
    },
    red: {
      main: red[400],
    },
    green: {
      main: green[100],
    },
    background: {
      main: green[500],
    },
  },

  button: {
    "&:disabled": {
      color: "red" || "secondary",
    },
  },
});

export default function SensiboCard(props) {
  const { id } = props;
  const isMounted = useRef(false);
  const [expanded, setExpanded] = React.useState(false);
  const [ACData, setACData] = useState([0]);
  const [status, setStatus] = useState("empty");
  const [onStatus, setOnStatus] = useState(false);
  const [mode, setMode] = useState("");
  const [targetTemperature, setTargetTemperature] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("");
  const [fanLevel, setFanLevel] = useState("");
  const [swing, setSwing] = useState("");
  const [light, setLight] = useState("");
  const [changedProperties, setChangedProperties] = useState("");
  const [reason, setReason] = useState("");
  const [failureReason, setFailureReason] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [buttonColor, setButtonColor] = useState("");

  useEffect(() => {
    isMounted.current = true;
    console.log("id: " + id);
    if (id) loadACData(id);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateValues = async (data) => {
    try {
      console.log(data);
      setACData(data);
      setStatus(data.status);
      setOnStatus(data.on);
      setDisabled(!data.on);
      !data.on ? setButtonColor("disabled") : setButtonColor("");
      console.log(onStatus);
      setMode(data.mode);
      setTargetTemperature(data.targetTemperature);
      setTemperatureUnit(data.temperatureUnit);
      setFanLevel(data.fanLevel);
      setSwing(data.swing);
      setLight(data.light);
      setChangedProperties(data.changedProperties);
      setReason(data.reason);
      setFailureReason(data.failureReason);
    } catch (error) {
      alert(error);
    }
  };

  const loadACData = async (id) => {
    try {
      const ACDataArray = await getACData(id);
      updateValues(ACDataArray);
    } catch (error) {
      alert(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePowerButton = async () => {
    try {
      const ACDataArray = await changeAcState(id, "on", !onStatus);
      updateValues(ACDataArray);
    } catch (error) {
      alert(error);
    }
  };

  const handleTemperatureChange = async (change) => {
    try {
      function newTemperature(change) {
        let newTemp = targetTemperature;
        if (change === "min") newTemp -= 1;
        if (change === "plus") newTemp += 1;
        return newTemp;
      }
      const ACDataArray = await changeAcState(
        id,
        "targetTemperature",
        newTemperature(change)
      );
      updateValues(ACDataArray);
    } catch (error) {
      alert(error);
    }
  };

  const handleModeChange = async (currentMode) => {
    try {
      function newMode(currentMode) {
        let newMode;
        switch (currentMode) {
          case "cool":
            newMode = "heat";
            break;
          case "heat":
            newMode = "fan";
            break;
          case "fan":
            newMode = "auto";
            break;
          case "auto":
            newMode = "dry";
            break;
          case "dry":
            newMode = "cool";
            break;
          default:
            newMode = "cool";
        }
        return newMode;
      }
      const ACDataArray = await changeAcState(id, "mode", newMode(currentMode));
      updateValues(ACDataArray);
    } catch (error) {
      alert(error);
    }
  };

  const handleFanSpeedChange = async (currentFanLevel) => {
    try {
      function newFanLevel(currentFanLevel) {
        let newFanLevel;
        switch (currentFanLevel) {
          case "auto":
            newFanLevel = "low";
            break;
          case "low":
            newFanLevel = "medium";
            break;
          case "medium":
            newFanLevel = "high";
            break;
          case "high":
            newFanLevel = "auto";
            break;
          default:
            newFanLevel = "auto";
        }
        return newFanLevel;
      }
      const ACDataArray = await changeAcState(
        id,
        "fanLevel",
        newFanLevel(currentFanLevel)
      );
      updateValues(ACDataArray);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: yellow[100],
          borderRadius: 5,
        }}
        color="primary"
        elevation={10}
        square="false">
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     20-C
          //   </Avatar>
          // }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={id}
          subheader={
            <div>
              Humidity: 44%
              <br />
              Temperature: 25.5 C<br />
              Feels like: 26.4 C
            </div>
          }
        />
        {/* <CardMedia></CardMedia> */}
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <IconButton
              disabled={disabled}
              sx={{ mx: "auto" }}
              onClick={() => handleTemperatureChange("min")}>
              <RemoveCircleOutlineIcon
                fontSize="large"
                // sx={{ color: blue[500] }}
                color={buttonColor || "blue"}></RemoveCircleOutlineIcon>
            </IconButton>

            {!buttonColor && (
              <Avatar
                sx={{
                  mx: "auto",
                  fontSize: "20px",
                  width: 56,
                  height: 56,
                  bgcolor: blue[200],
                }}>
                <div>
                  {targetTemperature}&#176;{temperatureUnit}
                </div>
              </Avatar>
            )}

            {buttonColor && (
              <Avatar
                sx={{
                  mx: "auto",
                  fontSize: "20px",
                  width: 56,
                  height: 56,
                  bgcolor: buttonColor,
                }}>
                <div>Off</div>
              </Avatar>
            )}

            <IconButton
              disabled={disabled}
              sx={{ mx: "auto" }}
              onClick={() => handleTemperatureChange("plus")}>
              <AddCircleOutlineIcon
                fontSize="large"
                color={buttonColor || "red"}></AddCircleOutlineIcon>
            </IconButton>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <IconButton
              sx={{ mx: "auto" }}
              aria-label="mode"
              onClick={() => handleModeChange(mode)}>
              <div>
                {mode == "cool" && (
                  <AcUnitIcon fontSize="large" color={buttonColor || "grey"} />
                )}
              </div>
              <div>
                {mode == "heat" && (
                  <Icon
                    icon="carbon:sun"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode == "fan" && (
                  <Icon
                    icon="whh:fan"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode == "auto" && (
                  <Icon
                    icon="ic:outline-hdr-auto"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode == "dry" && (
                  <Icon
                    icon="cil:drop"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
            </IconButton>
            <IconButton
              sx={{ mx: "auto" }}
              aria-label="mode"
              onClick={() => handleFanSpeedChange(fanLevel)}>
              <div>
                {fanLevel == "low" && (
                  <Icon
                    icon="mdi:fan-speed-1"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
                {fanLevel == "medium" && (
                  <Icon
                    icon="mdi:fan-speed-2"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
                {fanLevel == "high" && (
                  <Icon
                    icon="mdi:fan-speed-3"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
                {fanLevel == "auto" && (
                  <Icon
                    icon="mdi:fan-auto"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
            </IconButton>
            <IconButton
              sx={{ mx: "auto" }}
              aria-label="mode"
              onClick={handlePowerButton}>
              <div>
                {onStatus == true && (
                  <Icon
                    icon="fa-solid:power-off"
                    color="red"
                    style={{ fontSize: "36px" }}
                  />
                )}
                {onStatus == false && (
                  <Icon
                    icon="fa-solid:power-off"
                    color="green"
                    style={{ fontSize: "36px" }}
                  />
                )}
              </div>
            </IconButton>
          </Grid>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ bgcolor: grey[100], textAlign: "left" }}>
            {/* <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"> */}
            <Typography paragraph>Additional data:</Typography>
            <Typography paragraph>Status: {status}</Typography>
            {onStatus && <Typography paragraph>On: true</Typography>}
            {!onStatus && <Typography paragraph>On: false</Typography>}
            <Typography paragraph>Mode: {mode}</Typography>
            <Typography paragraph>
              Target temperature: {targetTemperature}
            </Typography>
            <Typography paragraph>
              Temperature unit: {temperatureUnit}
            </Typography>
            <Typography paragraph>Fan level: {fanLevel}</Typography>
            <Typography paragraph>Swing: {swing}</Typography>
            <Typography paragraph>Light: {light}</Typography>
            <Typography paragraph>
              Changed properties: {changedProperties}
            </Typography>
            <Typography paragraph>Reason: {reason}</Typography>
            <Typography paragraph>Failure reason: {failureReason}</Typography>
            {/* </Grid> */}
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
