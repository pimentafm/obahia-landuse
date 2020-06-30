import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Region from '../pages/Region';
import Watershed from '../pages/Watershed';
import Drainage from '../pages/Drainage';
import Counties from '../pages/Counties';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/region" component={Region} />
    <Route path="/gcc" component={Watershed} />
    <Route path="/drainage" component={Drainage} />
    <Route path="/counties" component={Counties} />
  </Switch>
);

export default Routes;
