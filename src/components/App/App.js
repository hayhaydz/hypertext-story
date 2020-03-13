import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App__left">
        <h1 className="App__left--title App__left--title_top">Student</h1>
        <h1 className="App__left--title App__left--title_bottom">Meals</h1>
        <button className="App__left--btn">
          <span>Begin your journey</span> 
          <i className="material-icons">arrow_forward</i>
        </button>
      </div>
      <div className="App__border"></div>
    </div>
  );
}

export default App;
