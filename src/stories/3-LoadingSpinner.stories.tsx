import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import {ErrorBarDecorator} from './decorators/decorators';

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  decorators: [ErrorBarDecorator]
};

export const PrintsAnError = () => {
  return (<LoadingSpinner/>);
};

PrintsAnError.story = {
  name: 'prints a spinner with loading message',
  parameters: {
    options: {
      showPanel: false,
    }
  }
};
