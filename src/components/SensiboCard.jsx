import * as React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange, green, blue, red, grey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import { getACData, changeACState } from "../lib/api";

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
  palette: {
    primary: {
      main: grey[400],
      backgroundColor: "#FFF",
      color: grey[900],
    },
    secondary: {
      main: orange[500],
    },
    grey: {
      main: grey[800],
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
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

export default function SensiboCard(props) {
  const { id, APIKey } = props;
  const isMounted = useRef(false);
  const [expanded, setExpanded] = useState(false);
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
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [currentHumidity, setCurrentHumidity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [buttonColor, setButtonColor] = useState("");

  const loadACData = useCallback(() => {
    return getACData(APIKey, id)
      .then((data) => {
        updateValues(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [APIKey, id]);

  useEffect(() => {
    isMounted.current = true;
    if (id) loadACData(APIKey, id);
    return () => {
      isMounted.current = false;
    };
  }, [APIKey, id, loadACData]);

  const updateValues = async (data) => {
    try {
      setStatus(data.status);
      setOnStatus(data.on);
      setDisabled(!data.on);
      !data.on ? setButtonColor("disabled") : setButtonColor("");
      setMode(data.mode);
      setTargetTemperature(data.targetTemperature);
      setTemperatureUnit(data.temperatureUnit);
      setFanLevel(data.fanLevel);
      setSwing(data.swing);
      setLight(data.light);
      setChangedProperties(data.changedProperties);
      setReason(data.reason);
      setFailureReason(data.failureReason);
      setCurrentTemperature(data.currentTemperature);
      setCurrentHumidity(data.currentHumidity);
    } catch (error) {
      alert(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePowerButton = async () => {
    try {
      const ACDataArray = await changeACState(APIKey, id, "on", !onStatus);
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
      const ACDataArray = await changeACState(
        APIKey,
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
      const ACDataArray = await changeACState(
        APIKey,
        id,
        "mode",
        newMode(currentMode)
      );
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
      const ACDataArray = await changeACState(
        APIKey,
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
          bgcolor: "primary.backgroundColor",
          borderRadius: 5,
        }}
        elevation={10}>
        <CardHeader
          title={"AC id: " + id}
          subheader={
            <div>
              Humidity: {currentHumidity}%
              <br />
              Temperature: {currentTemperature}&#176;{temperatureUnit}
              <br />
            </div>
          }
        />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            {targetTemperature && (
              <IconButton
                disabled={disabled}
                sx={{ mx: "auto" }}
                onClick={() => handleTemperatureChange("min")}>
                <RemoveCircleOutlineIcon
                  fontSize="large"
                  color={buttonColor || "blue"}></RemoveCircleOutlineIcon>
              </IconButton>
            )}
            {!buttonColor && mode !== "heat" && (
              <Avatar
                sx={{
                  mx: "auto",
                  fontSize: "20px",
                  width: 56,
                  height: 56,
                  bgcolor: blue[300],
                }}>
                {targetTemperature && (
                  <div>
                    {targetTemperature}&#176;{temperatureUnit}
                  </div>
                )}
                {mode === "fan" && (
                  <Icon
                    icon="wpf:fan"
                    style={{ fontSize: "30px" }}
                    color="#FFF"
                  />
                )}
              </Avatar>
            )}
            {!buttonColor && mode === "heat" && (
              <Avatar
                sx={{
                  mx: "auto",
                  fontSize: "20px",
                  width: 56,
                  height: 56,
                  bgcolor: red[300],
                }}>
                {targetTemperature && (
                  <div>
                    {targetTemperature}&#176;{temperatureUnit}
                  </div>
                )}
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
            {targetTemperature && (
              <IconButton
                disabled={disabled}
                sx={{ mx: "auto" }}
                onClick={() => handleTemperatureChange("plus")}>
                <AddCircleOutlineIcon
                  fontSize="large"
                  color={buttonColor || "red"}></AddCircleOutlineIcon>
              </IconButton>
            )}
          </Grid>
        </CardContent>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <IconButton
              disabled={disabled}
              sx={{ mx: "auto" }}
              aria-label="mode"
              onClick={() => handleModeChange(mode)}>
              <div>
                {mode === "cool" && (
                  <Icon
                    icon="ic:baseline-ac-unit"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode === "heat" && (
                  <Icon
                    icon="carbon:sun"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode === "fan" && (
                  <Icon
                    icon="whh:fan"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode === "auto" && (
                  <Icon
                    icon="ic:outline-hdr-auto"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
              <div>
                {mode === "dry" && (
                  <Icon
                    icon="cil:drop"
                    style={{ fontSize: "36px" }}
                    color={buttonColor || "grey"}
                  />
                )}
              </div>
            </IconButton>
            {fanLevel && (
              <IconButton
                disabled={disabled}
                sx={{ mx: "auto" }}
                aria-label="mode"
                onClick={() => handleFanSpeedChange(fanLevel)}>
                <div>
                  {fanLevel === "low" && (
                    <Icon
                      icon="mdi:fan-speed-1"
                      style={{ fontSize: "36px" }}
                      color={buttonColor || "grey"}
                    />
                  )}
                  {fanLevel === "medium" && (
                    <Icon
                      icon="mdi:fan-speed-2"
                      style={{ fontSize: "36px" }}
                      color={buttonColor || "grey"}
                    />
                  )}
                  {fanLevel === "high" && (
                    <Icon
                      icon="mdi:fan-speed-3"
                      style={{ fontSize: "36px" }}
                      color={buttonColor || "grey"}
                    />
                  )}
                  {fanLevel === "auto" && (
                    <Icon
                      icon="mdi:fan-auto"
                      style={{ fontSize: "36px" }}
                      color={buttonColor || "grey"}
                    />
                  )}
                </div>
              </IconButton>
            )}
            {!fanLevel && (
              <IconButton disabled sx={{ mx: "auto" }} aria-label="mode">
                <div>
                  <Icon icon="mdi:fan" style={{ fontSize: "36px" }} />
                </div>
              </IconButton>
            )}

            <IconButton
              sx={{ mx: "auto" }}
              aria-label="mode"
              onClick={handlePowerButton}>
              <div>
                {onStatus === true && (
                  <Icon
                    icon="fa-solid:power-off"
                    color="red"
                    style={{ fontSize: "36px" }}
                  />
                )}
                {onStatus === false && (
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
            <Typography paragraph>
              In future versions of this app, additional functionality will be
              available here.
            </Typography>
            <Typography paragraph>
              Data that the Sensibo API provides:
            </Typography>
            <Typography variant="body1">
              <ul>
                <li>Status: {status}</li>
                {onStatus && <li>On: true</li>}
                {!onStatus && <li>On: false</li>}
                <li>Mode: {mode}</li>
                <li>Target temperature: {targetTemperature}</li>
                <li>Temperature unit: {temperatureUnit}</li>
                <li>Fan level: {fanLevel}</li>
                <li>Swing: {swing}</li>
                <li>Light: {light}</li>
                <li>Changed properties: {changedProperties}</li>
                <li>Reason: {reason}</li>
                <li>Failure reason: {failureReason}</li>
                <li>Current temperature: {currentTemperature}</li>
                <li>Current humidity: {currentHumidity}</li>
              </ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
