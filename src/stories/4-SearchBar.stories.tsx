import React from 'react';
import { actions } from '@storybook/addon-actions';

import SearchBar from '../components/CardMultiDisplay/QueryBuilder/SearchBar/SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
}

export const DefaultSearchBar = () => {
  const actionProps = actions({onSearchChange: 'onSearchChange', onSubmit: 'onSubmit'});
  return <SearchBar {...actionProps}/>;
};

DefaultSearchBar.story = {
  name: 'with onSearchChange, onSubmit',
  parameters: {
    options: {
      showPanel: true,
    }
  }
};

