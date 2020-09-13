import React, { Component } from "react";
import LaunchPad from "./components/LaunchPad";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <LaunchPad />
      </div>
    );
  }
}

export default App;
