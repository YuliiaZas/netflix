import { useSelector } from 'react-redux';

import classes from './Pagination.module.css';

const Pagination = ({changePage}) => {
  const store = useSelector(state => state.shows);

  const getPagesArray = () => {
    let result = [];
    for (let i = 0; i < store.pageMax; i++) {
      result.push(i + 1)
    }
    return result;
  }

  let pagesArray = getPagesArray();

  return (
    <div className={classes.page__wrapper}>
      {pagesArray.map(p =>
        <span
            onClick={() => changePage(p)}
            key={p}
            className={store.page === p 
              ? `${classes.page} ${classes.page__current}` 
              : `${classes.page}`}>
          {p}
        </span>
      )}
    </div>
  );
};

export default Pagination;