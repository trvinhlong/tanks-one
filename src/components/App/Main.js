import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InStock from './InStock';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={InStock}/>
        </Switch>
    </main>
)

export default Main
