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
    // Counter is also used to increment cards inside of CardPages since they would all have been numbers 1-x causing
    // duplicate keys in sets of 20s so 1-20, 1-20, 1-20.
    // A new query resets pageNumber, but counter always increases.
    // loading locks us to one query at a time, but hasMore prevents further queries once we have all results.
    // hasMore is reset on new queries.
    // pages[] is appended to instead of replaced each time, so that we don't have to regenerate cards inefficiently
    // each time a new page is added. The Array is copied so as not to mutate the state.
    this.state = {
      query: '',
      pageNumber: 1,
      counter: 1,
      pages: [],
      loading: false,
      hasMore: true,
    };

    if (this.props.setState) {
      this._setState = this.setState;
      this.setState = function () {
        try {
          this.props.setState(...arguments)
        } catch(e) {};
        this._setState.apply(this, arguments);
      }
    }
  }

  // Loads initial page of results with blank search
  componentDidMount() {
    this.addPage();
  }

  /**
   * Concatenate tags and search fields into complex query string
   * Each tag has a 'type', which determines what it gets concatenated with.
   * These are sorted into separate arrays for boolean OR operations
   * like &attribute=Endurance|Strength
   *
   * So the tags passed to tagify have a display name, but also an associated type.
   * For special cases like misspelled tags in the database, their internal value such as
   * "Breakthrough" and "Breajthrough" are represented already in a compound query like so:
   * "Breakthrough|Breajthrough" under the heading of "Breakthrough"
   * See src/model/filterTags.json which were pulled from each category of search type: Attributes, Type,
   * Subtype, Set, Rarity (and any other I may have failed to mention)
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

    // Using concat to avoid mutating JSON data
    tags.forEach(tag => {
      if (filters[tag.type]) {
        filters[tag.type] = filters[tag.type].concat(tag._value);
      } else {
        filters[tag.type] = [].concat(tag._value);
      }
    });

    // Joining of similar search categories for the tags into compound query strings
    const filterKeys = Object.keys(filters);
    let queryParams = [];
    for (let i = 0; i < filterKeys.length; ++i) {
      let key = filterKeys[i];
      queryParams.push(`${encodeURIComponent(key)}=${filters[key].map(v => v.replace(' ', '%20')).join('|')}`);
    }

    // Search string for the name field
    if (query) {
      queryParams.push('name=' + encodeURIComponent(query));
    }

    const newQuery = queryParams.join('&');

    // Update state with new query if query is different.
    if (newQuery !== this.state.query) {
      this.setState({
        query: newQuery,
        pageNumber: 1,
        pages: [],
        hasMore: true,
      });
    }
  };

  // Only do this if the query changed, effectively handles the "search" button
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.query !== prevState.query) {
      this.addPage();
    }
  }

  // Lock loading of pages to the loading mutex and only if more are available
  loadNextPage = () => {
    if (!this.state.loading && this.state.hasMore) {
      this.addPage();
    }
  };

  // Have no opportunity to test atm, since the queries never seem to fail.
  // Tries reloading a card page in place by creating a new one and splicing it into the place of the old one.
  retryPage(counter, pageIndex, pageNumber, pageSize, query) {
    let pages = [].concat(this.state.pages);

    pages.splice(pageIndex, 1, (<CardPage
      key={counter} promise={elderScrollsLegendsAPI.getCards(pageNumber, pageSize, query)}
      onRetryClick={() => this.retryPage(counter, pageIndex, pageNumber, pageSize, query)}
      onLoaded={() => this.setState({ loading: false })}
    />));
  }

  // Adds a new page, which is tantamount to loading pageSize worth of cards,
  // because promises are created with the pages
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
        <QueryBuilder onSearch={onSearch}/>
        {pages.length ? (
        <div className={'page-container'}>
          {pages}
          {!loading && hasMore ? <LoadOnScroll key={0} onLoad={loadNextPage}/> : null}
        </div>) : null}
      </div>
    );
  }
}