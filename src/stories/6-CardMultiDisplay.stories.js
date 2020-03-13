import React from 'react';
import CardMultiDisplay from '../components/CardMultiDisplay/CardMultiDisplay';
import { withKnobs, number } from '@storybook/addon-knobs';
import { decorate } from '@storybook/addon-actions';

export default {
  title: 'CardMultiDisplay',
  component: CardMultiDisplay,
  decorators: [withKnobs],
};

const firstArg = decorate([args => [JSON.stringify(args[0], function (key, value) {
  if (key === 'pages') {
    return `[${value.map(({key}) => `{page key={${key}}}`).join(', ')}]`;
  } else {
    return value;
  }
})]]);

export const DefaultCardMultiDisplay = () => {
  const pageSize = number('pageSize', 20);
  return <CardMultiDisplay pageSize={pageSize} setState={firstArg.action('setState')}/>;
};

DefaultCardMultiDisplay.story = {
  name: 'with internal state and pageSize',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};
