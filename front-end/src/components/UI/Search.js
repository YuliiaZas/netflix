import { useRef } from 'react';

import classes from './Search.module.css';

function Search (props) {
  const searchRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    props.onSearch(searchRef.current.value);
  }

  function cancelHandler() {
    props.onClearSearch();
    searchRef.current.value = null;
  }

  return <form className={classes.search} onSubmit={submitHandler}>
    <div className={classes["input-container"]}>
      <label 
          htmlFor="search" 
          className="form__label">
        Search {props.title}
      </label>
      <input 
        type="text" 
        id="search" 
        placeholder={`Search ${props.title}`}
        className="form__input"
        required 
        ref={searchRef} />
    </div>
    <div className={classes["buttons-container"]}>
      <button 
          type="submit" 
          className="button button--main">
        Search
      </button>
      {props.searchNotEmpty && <button 
          type="reset" 
          className="button button--additional"
          onClick={cancelHandler}>
        Cancel
      </button>}
    </div>
  </form>;
}

export default Search;
