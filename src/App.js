import logo from "./logo.svg";
import React from "react";
import "./App.css";
import SensiboMain from "./components/SensiboMain";
import Welcome from "./components/Welcome";

const App = () => {
  const [APIKey, setAPIKey] = React.useState(
    localStorage.getItem("Test") || ""
  );

  React.useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", APIKey);
  }, [APIKey]);

  const editAPIKey = (newAPIKey) => setAPIKey(newAPIKey);

  console.log(APIKey);

  return (
    <div className="App">
      <header className="App-header">
        {APIKey && (
          <SensiboMain
            APIKey={APIKey}
            onEditAPIKey={(newAPIKey) => editAPIKey(newAPIKey)}></SensiboMain>
        )}
        {!APIKey && (
          <Welcome onEditAPIKey={(newAPIKey) => editAPIKey(newAPIKey)} />
        )}
      </header>
    </div>
  );
};

export default App;
