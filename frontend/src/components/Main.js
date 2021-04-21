import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from "react-router-dom";
import axios from "axios";
import {CUR_USER, GET_TOKEN} from "../constants";

import Feed from './Feed';
import Registration from './Registration';
import Login from './Login';
import SearchMovie from './SearchMovie';
import CreatePost from './CreatePost';
import { withRouter } from 'react-router';

class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
      console.log(props.path);
  
      return (
        <Route 
          {...props.path} 
          render={props => (
            this.props.state.loggedIn ?
              <Component {...props.component} /> :
              <Redirect exact to='/login'/>
          )} 
        />
      )
    }
  }
class Main extends Component {
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

    parseCurUser = (data, login) => {
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
            this.props.history.push('/home');
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
    }

    render() {
        return (
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                {/* <Route exact path='/' render ={() => (this.state.loggedIn ? ({Feed}) : (<Redirect to="/login"/>))}></Route> */}
                <ProtectedRoute path ='/home' component={Feed} state={this.state}/>
                <Route exact path='/signup' component={Registration}></Route>
                <Route exact path='/login' render={({parseCurUser}) => (<Login loginCallback = {this.parseCurUser} />)}/>
                <ProtectedRoute path='/search' component={SearchMovie} state={this.state}/>
            </Switch>
        );
    }
}

export default withRouter(Main);