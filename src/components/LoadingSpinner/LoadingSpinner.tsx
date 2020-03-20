import React from 'react';

import './LoadingSpinner.scss';

export default React.memo(function (props) {
  return (
    <div className={'loading-spinner-container'}>
      <p>Loading... please stand by.</p>
      <div className={'loading-spinner'}>
        <div className={'outer-ring'}/>
        <div className={'inner-ring'}/>
        <div className={'slider'}/>
        <div className={'slider'}/>
        <div className={'slider'}/>
        <div className={'slider'}/>
        <div className={'slider'}/>
      </div>
    </div>
  );
});
