import React from 'react';

import './App.scss';
import CardPage from './components/CardPage/CardPage';
import CardMultiDisplay from './components/CardMultiDisplay/CardMultiDisplay';

function App() {
  let [
    state,
    stateChanger
  ] = React.useState({});
  return (
    <div className="App">
      <CardMultiDisplay/>
      <CardPage key={1} page={1} pageSize={20}/>
    </div>
  );
}

export default App;
