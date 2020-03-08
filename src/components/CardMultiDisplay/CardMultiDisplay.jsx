import React from 'react';

import CardPage from '../CardPage/CardPage';
import QueryBuilder from './QueryBuilder/QueryBuilder';
import elderScrollsLegendsAPI from '../../api/ElderScrollsLegendsAPI';
import LoadOnScroll from './LoadOnScroll/LoadOnScroll';

import './CardMultiDisplay.scss';

export default class CardMultiDisplay extends React.Component {
  constructor (props) {
    super(props);

    // Counter is used to increment keys for card pages since pageNumber resets on new searches.
    this.state = {
      query: '',
      pageNumber: 1,
      counter: 1,
      pages: [],
      loading: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.addPage();
  }

  /**
   *
   * @param {{
   *   tags: Array.<{}>,
   *   query: string,
   * }} params
   */
  onSearch = (params) => {
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

    const newQuery = queryParams.join('&');
    if (newQuery !== this.state.query) {
      this.setState({
        query: newQuery,
        pageNumber: 1,
        pages: [],
        hasMore: true,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.query !== prevState.query) {
      this.addPage();
    }
  }

  loadNextPage = () => {
    if (!this.state.loading && this.state.hasMore) {
      this.addPage();
    }
  };

  retryPage(counter, pageIndex, pageNumber, pageSize, query) {
    let pages = [].concat(this.state.pages);

    pages.splice(pageIndex, 1, (<CardPage
      key={counter} promise={elderScrollsLegendsAPI.getCards(pageNumber, pageSize, query)}
      onRetryClick={() => this.retryPage(counter, pageIndex, pageNumber, pageSize, query)}
      onLoaded={() => this.setState({ loading: false })}
    />));
  }

  addPage = () => {
    let {
      state: {
        query,
        pageNumber,
        counter,
      },
      props: {
        pageSize
      }
    } = this;
    pageSize = pageSize || 20;

    const promise = elderScrollsLegendsAPI.getCards(pageNumber, pageSize, query);
    const pageIndex = this.state.pages.length;
    let pages = [].concat(this.state.pages, (
      <CardPage
        key={counter} promise={promise} keyIndex={counter * pageSize}
        onRetryClick={() => this.retryPage(counter, pageIndex, pageNumber, pageSize, query)}
        onLoaded={(hasMore) => {
          this.setState({ loading: false, hasMore });
        }}
      />));

    this.setState({
      pages,
      pageNumber: pageNumber + 1,
      counter: counter + 1,
      loading: true,
    });
  };

  render() {
    const {
      onSearch,
      loadNextPage,
      state: {
        pages,
        loading,
        hasMore,
      },
    } = this;

    return (
      <div>
        <QueryBuilder key={'superUnique'} onSearch={onSearch}/>
        {pages.length ? (
        <div className={'page-container'}>
          {pages}
          {loading && hasMore ? null : <LoadOnScroll key={0} onLoad={loadNextPage}/>}
        </div>) : null}
      </div>
    );
  }
}