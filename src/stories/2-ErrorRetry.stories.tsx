import React from 'react';
import { action } from '@storybook/addon-actions';

import ErrorRetry from '../components/ErrorRetry/ErrorRetry';
import {ErrorBarDecorator} from './decorators/decorators';

export default {
  title: 'ErrorRetry',
  component: ErrorRetry,
  decorators: [ErrorBarDecorator]
};

export const PrintsAnError = () => {
  return (<ErrorRetry onRetryClick={action('onRetryClick')}/>);
};

PrintsAnError.story = {
  name: 'prints a retry button',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};
