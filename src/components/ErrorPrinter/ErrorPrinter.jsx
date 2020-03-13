import React from 'react';

import './ErrorPrinter.scss';

export default React.memo(function (props) {
  const {
    children,
  } = props;

  return (
    <div className={'error-printer-container'}>
      <div className={'error-hazards left'}/>
      <div className={'error-hazards right'}/>
      <div className={'error-border'}>
        <p>{children}</p>
      </div>
    </div>
  )
});