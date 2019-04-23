import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Collection from './Collection'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/:name' component={Collection}/>
        </Switch>
    </main>
);

export default Main
