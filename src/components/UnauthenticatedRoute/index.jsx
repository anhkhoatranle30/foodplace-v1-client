import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailVerification from '../../pages/EmailVerification';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

export default function UnauthenticatedRoute() {
  return (
    <div style={{ minHeight: '95vh' }}>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/users/confirmation">
          <EmailVerification />
        </Route>
        <Route path="*">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
