import React from 'react';

import './ErrorRetry.scss';

export default React.memo(function (props) {
  const {
    onRetryClick
  } = props;

  return (
    <div className={'error-retry-container'}>
      <div className={'error-hazards left'}/>
      <div className={'error-hazards right'}/>
      <div className={'error-border'}>
        <button className={'button'} onClick={onRetryClick}>
          Load failed, Retry?</button>
      </div>
    </div>
  )
});