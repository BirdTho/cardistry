import React from 'react';

import './App.scss';
import CardMultiDisplay from './components/CardMultiDisplay/CardMultiDisplay';

function App() {
  return (
    <div className="App">
      <p className={'attribution'}>Sword icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      <CardMultiDisplay pageSize={20}/>
    </div>
  );
}

export default App;
