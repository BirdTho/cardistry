import React from 'react';
import Async from 'react-async';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorRetry from '../ErrorRetry/ErrorRetry';

import ErrorPrinter from '../ErrorPrinter/ErrorPrinter';

import elderScrollsLegendsAPI from '../../api/ElderScrollsLegendsAPI';

import './CardPage.scss';
import Card from '../Card/Card';

/*
 * The concept behind CardPage is to organize blocks of cards in 20s as arrays.
 * I really want this component to return an array rather than a single element with an array,
 * so hopefully it'll tile dynamically with other CardPage's cards. The cardpage can be responsible for querying
 * and letting the CardMultiDisplay know when it has updated successfully (this allowing the user to scroll down
 * and automatically load more cards). Without the success callback from loading, further autoloading in the
 * CardMultiDisplay will be halted.
 */
export default class CardPage extends React.Component {
  /**
   *
   * @param {{
   *   page: number,
   *   pageSize: number,
   *   query: string=
   * }} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @return {Promise}
   */
  get cardsPromise() {
    let {
      query,
      page,
      pageSize
    } = this.props;
    pageSize = pageSize || 20;

    return elderScrollsLegendsAPI.getCards(page, pageSize, query);
  }

  onRetryClick = () => {
    // This component doesn't need a state per se, the <Async/> promise wrapper handles the loading states
    // However if the loading fails and someone clicks "Retry", I should re-render for the opportunity to
    // fetch the page of cards (if the API went down for some reason)
    this.forceUpdate();
  };

  /**
   * @param {AxiosResponse.<CardsData>} response
   */
  getCards = (response) => {
    const {
      data: {
        cards,
      },
      status,
    } = response;

    if (status >= 400) {
      let message = null;
      switch (status) {
        case 400:
          message = 'Bad Request';
          break;
        case 403:
          message = 'Request rate limit exceeded';
          break;
        case 404:
          message = 'The requested resource could not be found.';
          break;
        case 500:
          message = 'Remote API server has internal problem, try again later.';
          break;
        case 503:
          message = 'API is offline for maintenance, try again later.';
          break;
        default:
      }
      if (message) {
        return (<ErrorPrinter>{message}</ErrorPrinter>)
      } else {
        return (<ErrorRetry onRetryClick={this.onRetryClick}/>);
      }
    }

    return cards.map((card, i) => <Card card={card} key={i}/>)
  };

  render() {
    const {
      cardsPromise,
      onRetryClick,
      getCards,
    } = this;

    return (
      <Async promise={cardsPromise}>
        <Async.Pending><LoadingSpinner/></Async.Pending>
        <Async.Rejected><ErrorRetry onRetryClick={onRetryClick}/></Async.Rejected>
        <Async.Fulfilled>{data => getCards(data)}</Async.Fulfilled>
      </Async>
    )
  }
}