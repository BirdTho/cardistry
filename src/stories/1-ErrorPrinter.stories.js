import React from 'react';
import ErrorPrinter from '../components/ErrorPrinter/ErrorPrinter';
import { withKnobs, text } from "@storybook/addon-knobs";
import {ErrorBarDecorator} from './decorators/decorators';

export default {
  title: 'ErrorPrinter',
  component: ErrorPrinter,
  decorators: [ErrorBarDecorator, withKnobs]
};

export const PrintsAnError = () => {
  const errorMessage = text('Error Message', 'This thing is broken, I suggest fixing it.');
  return (<ErrorPrinter>{errorMessage}</ErrorPrinter>);
};

PrintsAnError.story = {
  name: 'prints an error bar',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};
