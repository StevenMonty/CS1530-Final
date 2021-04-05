import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar.js";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar/>
        <Home />
      </Fragment>
    );
  }
}

export default App;
