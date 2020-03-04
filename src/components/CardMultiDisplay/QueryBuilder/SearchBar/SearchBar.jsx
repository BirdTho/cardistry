import React from 'react';

import './SearchBar.scss';

export default (props) => {
  const {
    onSearchChange,
    onSubmit,
  } = props;
  let ref = React.createRef();
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
              onClick={() => {ref.current.value = ''; onSearchChange('')}}>
        <div className={'cross'}/><div className={'cross'}/>
      </button>
    </div>
  );
};
