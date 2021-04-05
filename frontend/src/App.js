import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar.js";
import Feed from "./components/Feed.js"

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar/>
        <Feed/>
      </Fragment>
    );
  }
}

export default App;
