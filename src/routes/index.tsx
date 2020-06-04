import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Region from '../pages/Region';
import Watershed from '../pages/Watershed';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Region} />
    <Route path="/watershed" component={Watershed} />
  </Switch>
);

export default Routes;
