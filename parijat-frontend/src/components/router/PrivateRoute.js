import { h, Component } from 'preact';
import { Route, Redirect } from 'react-router';

export function isAuthenticated() {
  return ( localStorage.getItem('token') )
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
