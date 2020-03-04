import React from 'react';

import SearchBar from './SearchBar/SearchBar';
import Tags from "@yaireo/tagify/dist/react.tagify";

import data from '../../../model/filterTags.json';

import './QueryBuilder.scss';

const whitelist = data;

const tagsSettings = {
  duplicates: false,
  enforceWhitelist: true,
  editTags: false,
  whitelist,
  placeholder: 'Add filter tags for keywords, types, sets, attributes',
  autoComplete: {
    enabled: true,
  },
  backspace: true,
  dropdown: {
    enabled: 1,
    position: 'all',
    highlightFirst: true,
    searchKeys: ['_value'],
  },
  skipInvalid: true,
};

export default class QueryBuilder extends React.Component {
  /**
   * @param {{
   *   onSearch: function(Object)
   * }} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      query: '',
    };
  }

  onSubmit = () => {
    const {
      tags,
      query,
    } = this.state;

    this.props.onSearch({
      tags,
      query,
    });
  };

  onSearchChange = val => {
    this.setState({ query: val });
  };

  onTagChange = e => {
    this.setState({ tags: e.detail.tagify.value });
  };

  render = () => {
    const {
      onTagChange,
      onSearchChange,
      onSubmit,
    } = this;

    const settings = {
      ...tagsSettings,
      callbacks: {
        add: onTagChange,
        remove: onTagChange,
      }
    };

    return (
      <div className={'query-container'}>
        <SearchBar onSearchChange={onSearchChange} onSubmit={onSubmit}/>
        <Tags settings={settings}/>
        <button className={'query-search-button'} tabIndex={0} onClick={onSubmit}>Search</button>
      </div>
    );
  }
}
