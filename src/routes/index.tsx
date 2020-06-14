import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Region from '../pages/Region';
import Watershed from '../pages/Watershed';
import Drainage from '../pages/Drainage';
import Counties from '../pages/Counties';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Region} />
    <Route path="/watershed" component={Watershed} />
    <Route path="/drainage" component={Drainage} />
    <Route path="/county" component={Counties} />
  </Switch>
);

export default Routes;
