import React from 'react';
import Card from '../components/Card/Card';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Card',
  component: Card,
  decorators: [withKnobs],
};

const creatureCard = {
  'name': 'Reachman Shaman',
  'rarity': 'Common',
  'type': 'Creature',
  'subtypes': ['Reachman'],
  'cost': 2,
  'power': 2,
  'health': 2,
  'set': {'id': 'cs', 'name': 'Core Set', '_self': 'https://api.elderscrollslegends.io/v1/sets/cs'},
  'collectible': true,
  'soulSummon': 50,
  'soulTrap': 5,
  'text': 'At the start of your turn, give another random friendly creature +1/+1.',
  'attributes': ['Neutral'],
  'unique': false,
  'imageUrl': 'https://images.elderscrollslegends.io/cs/reachman_shaman.png',
  'id': '15d9c10821d4033fb045ed2cb4599ac76288ac67'
};

const effectCard = {
  'name': 'College of Winterhold',
  'rarity': 'Legendary',
  'type': 'Support',
  'cost': 5,
  'set': {'id': 'hos', 'name': 'Heroes of Skyrim', '_self': 'https://api.elderscrollslegends.io/v1/sets/hos'},
  'collectible': true,
  'soulSummon': 1200,
  'soulTrap': 400,
  'text': 'Uses: 3. Activate: Reveal three random 1-cost actions and draw one. Then, increase the cost of cards this reveals by 1.',
  'attributes': ['Intelligence'],
  'unique': true,
  'imageUrl': 'https://images.elderscrollslegends.io/hos/college_of_winterhold.png',
  'id': '5ea86d75cbb5f1d04f24e447736dfa510f083182'
};

export const BasicCard = () => {
  return <Card card={creatureCard}/>;
};

BasicCard.story = {
  name: 'with with power/health',
  parameters: {
    options: {
      showPanel: false,
    }
  }
};

export const EffectCard = () => {
  return <Card card={effectCard}/>;
};

EffectCard.story = {
  name: 'as spell/effect card',
  parameters: {
    options: {
      showPanel: false,
    }
  }
};

export const InteractCard = () => {
  const creatureKnobs = object('card{}', creatureCard, 'ID-1');
  return <Card card={creatureKnobs}/>;
};

InteractCard.story = {
  name: 'interact with me!',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};
