import React from 'react';

import CardPage from '../CardPage/CardPage';

export default class CardMultiDisplay extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    return (
      <CardPage key={0} pageSize={1} page={1}/>
    );
  }
}