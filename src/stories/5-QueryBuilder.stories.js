import React from 'react';
import {decorate} from '@storybook/addon-actions';
import QueryBuilder from '../components/CardMultiDisplay/QueryBuilder/QueryBuilder';

export default {
  title: 'QueryBuilder',
  component: QueryBuilder,
  decorators: [(draw) => {
    return (
      <div style={{
        width: '100vw',
        height: 'calc(100vh - 10px)',
        marginLeft: '-8px',
        marginTop: '-8px',
        position: 'absolute',
        paddingTop: '10px',
        backgroundColor: 'grey' }}>
        {draw()}
      </div>
    );
  }],
};

const firstArg = decorate([args => [JSON.stringify(args[0], function (key, value) {
  if (key === 'pages') {
    return `[${value.map(({key}) => `{page key={${key}}}`).join(', ')}]`;
  } else {
    return value;
  }
})]]);

export const DefaultQueryBuilder = () => {
  return <QueryBuilder onSearch={firstArg.action('onSearch')} setState={firstArg.action('setState')}/>;
};

DefaultQueryBuilder.story = {
  name: 'with onSearch',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};
