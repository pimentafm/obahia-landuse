import React from 'react';

import { Switch, Route } from 'react-router-dom'; 

import Region from './pages/Region';
import Watershed from './pages/Watershed';

export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Region}/>
            <Route path="/watershed" component={Watershed}/>
        </Switch>
    );
}