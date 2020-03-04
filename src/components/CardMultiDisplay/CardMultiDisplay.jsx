import React from 'react';

import CardPage from '../CardPage/CardPage';
import QueryBuilder from './QueryBuilder/QueryBuilder';

export default class CardMultiDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      query: '',
      tags: [],
    };
  }

  /**
   *
   * @param {{
   *   tags: Array.<{}>,
   *   query: string,
   * }} params
   */
  onSearch = (params) => {
    debugger;
    const {
      tags, query,
    } = params;

    let filters = {};

    tags.forEach(tag => {
      if (filters[tag.type]) {
        filters[tag.type] = filters[tag.type].concat(tag._value);
      } else {
        filters[tag.type] = [].concat(tag._value);
      }
    });

    const filterKeys = Object.keys(filters);
    let queryParams = [];
    for (let i = 0; i < filterKeys.length; ++i) {
      let key = filterKeys[i];
      queryParams.push(`${encodeURIComponent(key)}=${filters[key].map(v => v.replace(' ', '%20')).join('|')}`);
    }

    if (query) {
      queryParams.push('name=' + encodeURIComponent(query));
    }

    this.setState({ query, tags, queryString: queryParams.join('&')});
  };
  
  render() {
    const {
      onSearch,
      state: {
        queryString,
      },
    } = this;

    return (
      <div>
        <QueryBuilder onSearch={onSearch}/>
        <div>
          <CardPage key={0} pageSize={100} page={1} query={queryString}/>
        </div>
      </div>
    );
  }
}