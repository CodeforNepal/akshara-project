import { h, Component } from 'preact';
import { Route } from 'preact-router';
import Redirect from './Redirect';

export function isAuthenticated() {
  return ( localStorage.getItem('token') )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Redirect
      to="/login"
    />
  )
}

export default PrivateRoute;
