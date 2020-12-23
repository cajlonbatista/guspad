import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const Routes = props => {
  return (
    <Switch>
      <Route path='/' exact component={Main}/>
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register}/>
    </Switch>
  );
};

export default Routes;
