import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Feed from './Feed';
import Registration from './Registration';
import Login from './Login';
import SearchMovie from './SearchMovie';
import CreatePost from './CreatePost';

const Main = () => {
    return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Feed}></Route>
      <Route exact path='/signup' component={Registration}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/search' component={SearchMovie}></Route>
      <Route exact path='/post' component={CreatePost}></Route>
    </Switch>
    );
}

export default Main;