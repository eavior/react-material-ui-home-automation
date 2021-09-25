import logo from "./logo.svg";
import "./App.css";
import SensiboMain from "./components/SensiboMain";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SensiboMain />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
