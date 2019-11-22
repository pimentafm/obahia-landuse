import React from 'react';

import { Switch, Route } from 'react-router-dom'; 

import Region from './pages/Region';
import Watersheds from './pages/Watersheds';

export default function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Region}/>
            <Route path="/watersheds" component={Watersheds}/>
        </Switch>
    );
}