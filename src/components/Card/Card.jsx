import React from 'react';

import CardLabel from './CardLabel/CardLabel';
import { ReactComponent as Swords } from './fight.svg';
import { ReactComponent as Shield } from './basic-shield.svg';
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
      power,
      health,
    }
  } = props;

  return (
    <div className={'card'}>
      <div className={'card-image-container'}>
        <div className={'card-border'}/>
        <img className={'card-image'} src={imageUrl} alt={name}/>
      </div>
      {power != null && health != null ? (
      <div className={'stats'}>
        <div className={'stats__stat'}><Swords className={'stats__sword'}/><span className={'stats__stat-text'}>{power}</span></div>
        <div className={'stats__stat'}><Shield className={'stats__shield'}/><span className={'stats__stat-text'}>{health}</span></div>
      </div>
        ): null}
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
