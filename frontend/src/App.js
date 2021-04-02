import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
    console.log('logged in? ' + this.state.logged_in)
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default App;
