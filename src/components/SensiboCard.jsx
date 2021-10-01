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
import { deepOrange, green, blue, red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Icon } from "@iconify/react";

import Grid from "@mui/material/Grid";

import { getACData } from "../lib/api";

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
  const [buttonColor, setButtonColor] = useState(300);

  useEffect(() => {
    isMounted.current = true;
    console.log("id: " + id);
    if (id) loadACData(id);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadACData = async (id) => {
    try {
      const ACDataArray = await getACData(id);
      // console.log(userACs);
      console.log(ACDataArray);
      setACData(ACDataArray);
      setStatus(ACDataArray.status);
      setOnStatus(ACDataArray.on);
      console.log(onStatus);
      setMode(ACDataArray.mode);
      setTargetTemperature(ACDataArray.targetTemperature);
      setTemperatureUnit(ACDataArray.temperatureUnit);
      setFanLevel(ACDataArray.fanLevel);
      setSwing(ACDataArray.swing);
      setLight(ACDataArray.light);
      setChangedProperties(ACDataArray.changedProperties);
      setReason(ACDataArray.reason);
      setFailureReason(ACDataArray.failureReason);
    } catch (error) {
      alert(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 300 }}>
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
          <IconButton disabled={disabled} sx={{ mx: "auto" }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              sx={{ color: blue[{ buttonColor }] }}></RemoveCircleOutlineIcon>
          </IconButton>

          <IconButton sx={{ mx: "auto", bgcolor: blue[500] }}>
            <Avatar sx={{ bgcolor: blue[500] }}>
              <div>20&#176;C</div>
            </Avatar>
          </IconButton>

          <IconButton sx={{ mx: "auto" }}>
            <AddCircleOutlineIcon
              fontSize="large"
              sx={{ color: red[500] }}
              variant="contained"></AddCircleOutlineIcon>
          </IconButton>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <IconButton sx={{ mx: "auto" }} aria-label="mode">
            <div>{mode == "cool" && <AcUnitIcon fontSize="large" />}</div>
          </IconButton>

          <IconButton sx={{ mx: "auto" }} aria-label="mode">
            <div>
              {mode == "cool" && (
                <Icon icon="mdi:fan-speed-1" style={{ fontSize: "36px" }} />
              )}
              {/* <Icon icon="mdi:fan-auto" /> */}
            </div>
          </IconButton>

          <IconButton sx={{ mx: "auto" }} aria-label="mode">
            <div>
              {onStatus == true && (
                <Icon
                  icon="fa-solid:power-off"
                  style={{ color: "green", fontSize: "36px" }}
                />
              )}
              {onStatus == false && (
                <Icon
                  icon="fa-solid:power-off"
                  style={{ color: "red", fontSize: "36px" }}
                />
              )}
            </div>
          </IconButton>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          Additional text.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Additional text:</Typography>
          <Typography paragraph>Status: {status}</Typography>
          {onStatus && <Typography paragraph>On: true</Typography>}
          {!onStatus && <Typography paragraph>On: false</Typography>}
          <Typography paragraph>Mode: {mode}</Typography>
          <Typography paragraph>
            Target temperature: {targetTemperature}
          </Typography>
          <Typography paragraph>Temperature unit: {temperatureUnit}</Typography>
          <Typography paragraph>Fan level: {fanLevel}</Typography>
          <Typography paragraph>Swing: {swing}</Typography>
          <Typography paragraph>Light: {light}</Typography>
          <Typography paragraph>
            Changed properties: {changedProperties}
          </Typography>
          <Typography paragraph>Reason: {reason}</Typography>
          <Typography paragraph>Failure reason: {failureReason}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
