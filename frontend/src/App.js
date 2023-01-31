import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const makeApiRequest = () => {
    axios("api/test-with-current-user").then((response) => {
      console.log("Response", response);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Отредактируй <code>src/App.js</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Изучить React 123
        </a>
      </header>

      <button onClick={makeApiRequest}>SHOW</button>
    </div>
  );
}

export default App;
