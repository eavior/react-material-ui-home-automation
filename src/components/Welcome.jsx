import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

const Welcome = (props) => {
  const { onEditAPIKey } = props;
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    const { onEditAPIKey } = props;
    onEditAPIKey(value);
    console.log("submit done: " + value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="column" spacing={2}>
          <item>
            <h3>Welcome to the first test version of this app!</h3>
            <h5>
              {" "}
              To start controlling your airconditioners, please enter your
              Sensibo API key here:
            </h5>
          </item>
          <item>
            <TextField
              id="APIKey"
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </item>
          <item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(e) => onSubmit(e)}>
              Add
            </Button>
          </item>
        </Stack>
      </header>
    </div>
  );
};

export default Welcome;
