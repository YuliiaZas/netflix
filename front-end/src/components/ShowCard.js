import { useSelector, useDispatch } from 'react-redux';

import { showsActions } from '../store/showsSlice'

import classes from './ShowCard.module.css';

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
    <div className={classes.card}>
      <div className={classes["card__main-part"]}>
        <img src={props.show.image.medium} alt={props.show.name} />
      </div>
      <div className={classes["card__additional-part"]}>
        <h3 className={classes.card__title}>{props.show.name}</h3>
        <p className={classes.card__content}>{props.show.genres.join(', ')}</p>
        {start && <p className={classes.card__content}>{start} - {end}</p>}
        <p className={classes.card__content}>Rating: {props.show.rating.average || 'N/A'}</p>
        <div className={classes["card__buttons-container"]}>
          {!isShowLiked && <button type="button"
              onClick={likeShowHandler}
              className={`button ${classes.card__button} ${classes["card__button--main"]}`}>
            &#9825;
          </button>}
          {isShowLiked && <button type="button"
              onClick={unlikeShowHandler}
              className={`button ${classes.card__button} ${classes["card__button--main"]}`}>
            &#9829;
          </button>}
        </div>
      </div>
    </div>
  )
}

export default ShowCard;
