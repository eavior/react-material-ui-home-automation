import logo from "./logo.svg";
import "./App.css";
import Examples from "./components/Examples";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Examples />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
