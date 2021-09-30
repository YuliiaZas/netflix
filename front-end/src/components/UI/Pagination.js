import { useSelector } from 'react-redux';

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
    <div className="page__wrapper">
      {pagesArray.map(p =>
        <span
            onClick={() => changePage(p)}
            key={p}
            className={store.page === p ? 'page page__current' : 'page'}>
          {p}
        </span>
      )}
    </div>
  );
};

export default Pagination;