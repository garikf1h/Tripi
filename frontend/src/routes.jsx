import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
// import App from './pages/';
import {MainPage} from './pages/Main/App';
import Login from './pages/Login/App';
import RecommendPage from './pages/recommendationpage/App';
// import LoginPage from './pages/Login';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Login}></Route>
        <Route exact path='/map' component={MainPage}></Route>
        <Route exact path='/recommend' component={RecommendPage}></Route>
      {/*<Route exact path='/signup' component={Signup}></Route>*/}
    </Switch>
  );
}

export default Main;