import React from 'react';

import './App.scss';
import ErrorRetry from './components/ErrorRetry/ErrorRetry';

function App() {
  return (
    <div className="App">
      <ErrorRetry onRetryClick={() => {}}/>
    </div>
  );
}

export default App;
