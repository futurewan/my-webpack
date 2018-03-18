import React from "react";
import { Switch, Route } from "react-router-dom";

import {view as HomeComponent} from "../pages/home/index";
import NotFind from "../pages/notFind";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/home" component={HomeComponent} />
        <Route path="*" component={NotFind} />
    </Switch>
);

export default Routes;
