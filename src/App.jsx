import React from 'react';

import './App.scss';
import CardPage from './components/CardPage/CardPage';

function App() {
  return (
    <div className="App">
      <CardPage key={1} page={1} pageSize={20}/>
    </div>
  );
}

export default App;
