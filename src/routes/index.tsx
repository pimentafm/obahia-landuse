import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Region from '../pages/Region';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Region} />
  </Switch>
);

export default Routes;
