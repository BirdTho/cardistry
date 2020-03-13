import React from 'react';
import Async from 'react-async';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorRetry from '../ErrorRetry/ErrorRetry';

import ErrorPrinter from '../ErrorPrinter/ErrorPrinter';

import Card from '../Card/Card';

/*
 * The concept behind CardPage is to organize blocks of cards in 20s as arrays.
 * I really want this component to return an array rather than a single element with an array of children
 * so it'll tile dynamically with other CardPage's cards. The CardPage can be responsible for resolving and rendering
 * the card API promise and tell CardMultiDisplay when it has updated successfully
 * (this allowing the user to scroll down to automatically load more cards).
 * Without the success callback from loading, further auto-loading in the
 * CardMultiDisplay will be halted.
 *
 * Because CardPage handles promise resolution, it also needs to tell CardMultiDisplay when there are no more cards.
 */
export default class CardPage extends React.Component {
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

    const {
      onLoaded,
      keyIndex,
    } = this.props;

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

    onLoaded(cards.length === response.data._pageSize);
    return cards.map((card, i) => <Card card={card} key={keyIndex + i}/>)
  };

  render() {
    const {
      props: {
        promise,
        onRetryClick,
      },
      getCards,
    } = this;

    return (
      <Async promise={promise}>
        <Async.Pending><LoadingSpinner/></Async.Pending>
        <Async.Rejected><ErrorRetry onRetryClick={onRetryClick}/></Async.Rejected>
        <Async.Fulfilled>{data => {
            return getCards(data);
          }}</Async.Fulfilled>
      </Async>
    )
  }
}