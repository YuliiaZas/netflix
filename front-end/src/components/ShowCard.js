import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { showsActions } from '../store/showsSlice'

const ShowCard = props => {
  const dispatch = useDispatch();
  const isShowLiked = useSelector(state => {
    return state.shows.likedShowsIds.includes(props.show.id);
  });

  const likeShowHandler = () => {
    dispatch(showsActions.likeShow(props.show.id));
  };
  const unlikeShowHandler = () => {
    dispatch(showsActions.unlikeShow(props.show.id));
  };

  const getYear = dateString => {
    return dateString ? dateString.split("-")[0] : null;
  };
  const start = getYear(props.show.premiered);
  const end = getYear(props.show.ended) || 'Now';

  return (
    <div className="card">
      <div className="card__main-part">
        <img src={props.show.image.medium} alt={props.show.name} />
      </div>
      <div className="card__additional-part">
        <h3 className="card__title">{props.show.name}</h3>
        <p className="card__content">{props.show.genres.join(', ')}</p>
        {start && <p className="card__content">{start} - {end}</p>}
        <p className="card__content">Rating: {props.show.rating.average || 'N/A'}</p>
        <div className="card__buttons-container">
          {!isShowLiked && <button type="button"
              onClick={likeShowHandler}
              className="button card__button card__button--main">
            &#9825;
          </button>}
          {isShowLiked && <button type="button"
              onClick={unlikeShowHandler}
              className="button card__button card__button--main">
            &#9829;
          </button>}
        </div>
      </div>
    </div>
  )
}

export default ShowCard;
