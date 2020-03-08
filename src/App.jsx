import React from 'react';

import './App.scss';
import CardMultiDisplay from './components/CardMultiDisplay/CardMultiDisplay';

function App() {
  return (
    <div className="App">
      <CardMultiDisplay pageSize={20}/>
    </div>
  );
}

export default App;
