import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { grey } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@iconify/react";

const Welcome = (props) => {
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    const { onEditAPIKey } = props;
    onEditAPIKey(value);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        color: "#000",
        bgcolor: grey[100],
        borderRadius: 5,
        m: 5,
        p: 5,
      }}>
      <div>
        <h3>Welcome to the first test version of this app!</h3>
        <p>
          To start controlling your airconditioner(s), please enter your Sensibo
          API key here:
        </p>
      </div>

      <div>
        <TextField
          id="APIKey"
          variant="outlined"
          label="API Key"
          sx={{
            color: grey[100],
            minWidth: 350,
            m: 1,
          }}
          onChange={(e) => onChange(e)}
        />
        {/* <TextField
          id="TestKey"
          variant="outlined"
          label="Test code - to connect with Elisha's office AC"
          sx={{
            color: grey[100],
            minWidth: 350,
            m: 1,
          }}
          onChange={(e) => onChange(e)}
        /> */}
      </div>
      <div>
        <Button
          variant="contained"
          sx={{
            m: 1,
          }}
          size="small"
          startIcon={<SaveIcon />}
          onClick={(e) => onSubmit(e)}>
          Save for this session
        </Button>
      </div>

      <div>
        <div>Please note that this is only a test version!</div>
        <div>The following features are planned for future versions:</div>
      </div>
      <div>
        <List
          sx={{
            width: "100%",
            mx: "auto",
          }}
          aria-label="contacts">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="account creation (email/Google/Apple/Facebook)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="back-end server + MongoDB database to save all relevant data (like API key, account data, 'friendly' AC names, data history)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="'climate react' control (including disabling 'climate react' when the AC is turned off by a user or by a scheduler)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="graphs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="schedules" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="enabling/disabling 'climate react' by schedule" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="maintain a constant room temperature (by making use of fan speed, target temperature etc. instead of Sensibo's 'climate react')" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="setting a night mode (higher temperature than during the day)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="connection to movement sensors & Shelly relays (to control fans)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="icons8:idea" />
              </ListItemIcon>
              <ListItemText primary="inclusion of other home automation products" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Stack>
  );
};

export default Welcome;
