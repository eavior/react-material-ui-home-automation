import React from "react";
import "./App.css";
import SensiboMain from "./components/SensiboMain";
import Welcome from "./components/Welcome";
import { grey } from "@mui/material/colors";

const App = () => {
  const [APIKey, setAPIKey] = React.useState(
    localStorage.getItem("Test") || ""
  );

  React.useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", APIKey);
  }, [APIKey]);

  const editAPIKey = (newAPIKey) => setAPIKey(newAPIKey);

  return (
    <div
      className="App"
      sx={{
        bgcolor: grey[500],
      }}>
      <header className="App-header">
        {APIKey && <SensiboMain APIKey={APIKey}></SensiboMain>}
        {!APIKey && (
          <Welcome onEditAPIKey={(newAPIKey) => editAPIKey(newAPIKey)} />
        )}
      </header>
    </div>
  );
};

export default App;
