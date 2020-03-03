import React from 'react';
import cn from 'classnames';

import './CardLabel.scss';

/**
 *
 * @param {{
 *   text: string,
 *   superscript: string=,
 * }} props
 * @return {*}
 */
export default props => {
  const {
    superscript,
    text,
  } = props;

  return (
    <div className={cn('card-label', superscript ? 'with-supertext' : null)}>
      {superscript && <span className={'supertext'}>{superscript}</span>}
      <span className={'main'}>{text}</span>
    </div>
  )
};
