import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from '../AppContext';

const GuestRoute = ({ component: Component, ...rest }) => {
  const {loggedIn} = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default GuestRoute;