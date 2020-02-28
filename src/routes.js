import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Region from '~/pages/Region';
import Watershed from '~/pages/Watershed';
import Drainage from '~/pages/Drainage';
import County from '~/pages/County';
import Report from '~/pages/Report';

export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Region}/>
            <Route path="/watershed" component={Watershed}/>
            <Route path="/drainage" component={Drainage}/>
            <Route path="/county" component={County}/>
            <Route path="/report" component={Report}/>
        </Switch>
    );
}
