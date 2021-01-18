import React from 'react'
import { Route, Switch } from 'react-router-dom';
import InitialPage from '../components/InitialPage';

const CHARACTERS_PATH = '/characters';

/**
 * Routes configures the routes to be used and renders the component according with them
 */
export default function Routes() {
  return (
    <Switch>
      <Route component={InitialPage} exact path='/' />
      <PrivateRoute component={<InitialPage />} exact path={CHARACTERS_PATH} />
    </Switch>
  );
}

function PrivateRoute({ component, ...rest }) {
return (
  <Route {...rest} render={() => component} />
);
}