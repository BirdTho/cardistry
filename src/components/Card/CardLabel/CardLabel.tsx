import React from 'react';
import cn from 'classnames';

import './CardLabel.scss';

interface CardLabelProps {
  superscript?: string | null | undefined,
  text: string,
}

export default (props: CardLabelProps) => {
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
