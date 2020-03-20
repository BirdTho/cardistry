import React from 'react';

import './SearchBar.scss';

interface SearchBarProps {
    onSearchChange: (query: string) => void,
    onSubmit: () => void,
}

export default (props: SearchBarProps) => {
  const {
    onSearchChange,
    onSubmit,
  } = props;
  let ref: any = React.createRef();

  // Having focus on input causes enter key to always trigger onSubmit. If "clear" is clicked, then we must
  // immediately refocus the search input. Otherwise typing will fail and enter key will clear.

  return (
    <div className={'search-container'}>
      <input className="searchbar"
             type="text"
             placeholder="Search"
             aria-label="Search"
             ref={ref}
             onChange={() => onSearchChange(ref.current.value)}
             onKeyDown={(event) => { if (event.key === "Enter") { onSubmit(); }}}
      />
      <button className={'clear-btn'}
              onClick={(e) => {
                ref.current.focus();
                e.preventDefault();
                ref.current.value = '';
                onSearchChange('');
              }}>
        <div className={'cross'}/>
        <div className={'cross'}/>
      </button>
    </div>
  );
};
