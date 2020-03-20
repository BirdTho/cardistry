import React from 'react';

export const ErrorBarDecorator = (draw: () => any) => {
  return (
    <div style={{
      width: '100vw',
      height: 'calc(50vh + 25px)',
      position: 'absolute',
      backgroundColor: 'grey',
      paddingTop: 'calc(50vh - 25px)'}}>
      {draw()}
    </div>
  );
};
