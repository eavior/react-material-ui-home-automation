import * as React from "react";
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
  const [expanded, setExpanded] = React.useState(false);
  const [mode, setMode] = React.useState("cool");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 250, maxWidth: 300 }}>
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
            <Avatar sx={{ bgcolor: blue[500] }} variant="square">
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
