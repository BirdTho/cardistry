import React from 'react';

import CardLabel from './CardLabel/CardLabel';

import './Card.scss';

/**
 *
 * @param {CardData} props
 * @return {*}
 * @constructor
 */
export default function Card (props) {
  const {
    card: {
      imageUrl,
      name,
      text,
      set,
      type,
      cost,
      attributes,
      rarity,
    }
  } = props;

  return (
    <div className={'card'}>
      <div className={'card-image-container'}>
        <div className={'card-border'}/>
        <img className={'card-image'} src={imageUrl} alt={name}/>
      </div>
      <div className={'card-label-container'}>
        <CardLabel text={name}/>
        <CardLabel superscript={'Type'} text={type}/>
        <CardLabel superscript={'Set'} text={set.name}/>
        <CardLabel superscript={'Rarity'} text={rarity}/>
      </div>
      <div className={'card-cost'}>
        <span>{cost}</span>
      </div>
      <div className={'card-description'}>
        {text && <p className={'description'}>{text}</p>}
        <span className={'card-attribute'}>Attributes: </span>
        {attributes.map((attr, i) => <span key={i} className={'card-attribute'}>{attr}</span>)}
      </div>
    </div>
  );
};
