import React from 'react';

import SearchBar from './SearchBar/SearchBar';
import Tags from "@yaireo/tagify/dist/react.tagify";

import filterTags, {CardFilterTags} from '../../../model/CardFilterTags';

import './QueryBuilder.scss';
import {SearchParams} from "../CardMultiDisplay";

const whitelist = filterTags;

const tagsSettings = {
  duplicates: false,
  enforceWhitelist: true,
  editTags: false,
  whitelist,
  placeholder: 'Add tags to filter results',
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

interface QueryBuilderProps {
  onSearch: (params: SearchParams) => void,
  setState?: any,
}

interface QueryBuilderState {
  tags: CardFilterTags[],
  query: string,
}

// QueryBuilder is a single source of truth for the search terms.
// It handles garthering search terms and tags as well as dispatching the command to search through
// the onSearch() command.
export default class QueryBuilder extends React.Component<QueryBuilderProps, QueryBuilderState> {
  _setState?: any;

  constructor(props: QueryBuilderProps) {
    super(props);

    this.state = {
      tags: [],
      query: '',
    };

    this._setState = function () {};

    if (this.props.setState) {
      this._setState = this.setState;
      this.setState = function () {
        try {
          this.props.setState(...arguments);
        } catch(e) {}
        this._setState.apply(this, arguments);
      }
    }
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

  onSearchChange = (val: string) => {
    this.setState({ query: val });
  };

  onTagChange = (e: any) => {
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
