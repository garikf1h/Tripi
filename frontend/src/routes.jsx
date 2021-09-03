import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
// import App from './pages/';
import {BuildTrip} from './pages/Main/App';
import Login from './pages/Login/App';
import {RecommendPage} from './pages/recommendationpage/App';
import {AboutUsPage} from './pages/AboutUs/App';
import {HomePage} from './pages/Home/App';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/build' component={BuildTrip}></Route>
        <Route exact path='/recommend' component={RecommendPage}></Route>
        <Route exact path='/about-us' component={AboutUsPage}></Route>
    </Switch>
  );
}

export default Main;