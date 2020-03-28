import React from 'react';
import { 
  Route, 
  Switch
} from "react-router-dom";
import './App.scss';

import Home from '../Home/Home';
import Instructions from '../Instructions/Instructions';
import Story from '../Story/Story';
import NoMatch from '../NoMatch/NoMatch';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route path='/instructions' >
          <Instructions />
        </Route>
        <Route path='/story' >
          <Story />
        </Route>
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
