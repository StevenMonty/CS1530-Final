import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar.js";
import Feed from "./components/Feed.js"
import axios from "axios";
import {CUR_USER, GET_TOKEN} from "./constants";

class App extends Component {
    state = {
        loggedIn: false,
        token: '',
        username: '',
        fName: '',
        lName: '',
        id:0
    }

    componentWillMount() {
        this.initState();
    }
    parseCurUser(data, login){
        console.log('Parse Cur User Data: ' + login);
        console.log(data);
        if (login){
            this.setState({
                loggedIn: true,
                token: data.JWT,
                username: data.user.username,
                fName: data.user.first_name,
                lName: data.user.last_name,
                id: data.user.pk,
            });
            localStorage.setItem('JWT', data.JWT);  // TODO remove this from localStorage on logout
            axios.defaults.headers.common = { Authorization: `JWT ${data.JWT}`}
        } else {
            this.setState({
                loggedIn: true,
                username: data.username,
                fName: data.first_name,
                lName: data.last_name,
                id: data.pk,
            });
        }
    }

    initState = () => {
        /* JWT is the auth token to associate a backend user account with a front end session.
           If this token is not in localStorage, the user is logged out and should be shown the login page,
           if true, then they should be shown their feed.
         */
        let loggedIn = localStorage.getItem('JWT') != null;
        if (!loggedIn){
            let req = {
                    username: "admin",
                    password: "root"
                }
            console.log('NOT LOGGED IN!')
            console.log(JSON.stringify(req))
            axios.post(GET_TOKEN,(req))
                .then(res => this.parseCurUser(res.data, true));
        } else {
            console.log('LOGGED IN!')
            this.setState({token: localStorage.getItem('JWT')})
            axios.defaults.headers.common = { Authorization: `JWT ${localStorage.getItem('JWT')}`}
            axios.get(CUR_USER,{
                headers: {
                    Authorization: `JWT ${localStorage.getItem('JWT')}`
                }
            }).then(res => this.parseCurUser(res.data, false));

        }

    };

    render() {
    return (
      <Fragment>
        <NavBar user={this.state}/>
        <Feed/>
      </Fragment>
    );
  }
}

export default App;
