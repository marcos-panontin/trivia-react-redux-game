import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';

function App() {
  return (

    <Switch>
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>

  );
}

export default App;
