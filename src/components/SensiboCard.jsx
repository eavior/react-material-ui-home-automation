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
  // const [ACData, setACData] = useState([0]);
  // const [success, setSuccess] = useState("empty");
  // const [on, setOn] = useState("");
  const [mode, setMode] = useState("cool");
  // const [targetTemperature, setTargetTemperature] = useState("");
  // const [fanLevel, setFanLevel] = useState("");
  // const [swing, setSwing] = useState("");
  // const [failureReason, setFailureReason] = useState("");

  useEffect(() => {
    isMounted.current = true;
    console.log("id: " + id);
    // if (id) loadACData(id);
    return () => {
      isMounted.current = false;
    };
  }, []);

  // const loadACData = async (id) => {
  //   try {
  //     console.log(id);
  //     const ACDataArray = await getACData(id);
  //     // console.log(userACs);
  //     console.log(ACDataArray);

  //     const reference = [
  //       {
  //         id: "BjHq2fCHco_nHnZCCyivW",
  //         status: "Failed",
  //         acState: {
  //           timestamp: {
  //             time: "2021-09-30T14:30:18.786002Z",
  //             secondsAgo: 0,
  //           },
  //           on: false,
  //           mode: "cool",
  //           targetTemperature: 21,
  //           temperatureUnit: "C",
  //           fanLevel: "high",
  //           swing: "stopped",
  //           horizontalSwing: "stopped",
  //           light: "on",
  //         },
  //         changedProperties: [],
  //         reason: "GoogleAssistant",
  //         failureReason: "PodNotConnected",
  //       },
  //     ];

  //     console.log(reference[0].status);

  //     setACData(ACDataArray);
  //     setSuccess(ACDataArray[0].status);
  //     console.log(success);
  //     if (success === "Success") console.log("yey");
  //     //       setFailureReason();
  //     // setOn();
  //     // setMode();
  //     // setTargetTemperature();
  //     // setFanLevel();
  //     // setSwing();

  //     // var result = acData.map((acData) => acData.acState);
  //     // console.log(acData);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

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
          <IconButton sx={{ mx: "auto" }}>
            <RemoveCircleOutlineIcon
              fontSize="large"
              sx={{ color: blue[500] }}></RemoveCircleOutlineIcon>
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
              {mode == "cool" && (
                <Icon
                  icon="fa-solid:power-off"
                  style={{ color: "red", fontSize: "36px" }}
                />
              )}
              {/* <Icon icon="mdi:fan-auto" /> */}
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
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
