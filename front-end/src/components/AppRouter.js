import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from './../pages/Login';
import Shows from './../pages/Shows';
import Favorites from './../pages/Favorites';
import Friends from './../pages/Friends';
import Header from './layout/Header';

import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuth = useSelector(state => state.shows.isAuth);
  return (
    <Switch>
      <Route path='/' exact component={Login} />
      {isAuth && (<Route path='/'>
        <Header />
        <Route path='/shows' component={Shows} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/friends' component={Friends} />
        <Redirect path='*' to='/shows' />
      </Route>)}
      <Redirect to='/' />
    </Switch>
  );
}

export default AppRouter;
