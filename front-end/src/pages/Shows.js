import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';

import { fetchShowsData, fetchLikedShowsData, sendLikedShowsData } from '../store/showsRequestActions';
import { showsActions } from '../store/showsSlice';
import ShowList from '../components/ShowList';
import Pagination from '../components/UI/Pagination';

let isInitial = true;

function Shows() {
  const store = useSelector(state => state.shows);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchShowsData());
    dispatch(fetchLikedShowsData());
  }, [dispatch]);
  
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (store.changed) {
      dispatch(sendLikedShowsData(store.likedShowsIds));

    }
  }, [store.likedShowsIds, dispatch]);

  useEffect(() => {
    if (isInitial) {
      return;
    }
    dispatch(showsActions.replaceLikedShows(store.likedShowsIds));
  }, [store.allShows, dispatch]);

  const currentShows = useSelector(state => state.shows.currentShows);
  const changePage = page => {
    dispatch(showsActions.replacePage(page));
    dispatch(showsActions.replaceCurrentShows());
  };

  return <Fragment>
    <ShowList shows={currentShows} />
    <Pagination changePage={changePage} />
  </Fragment>
}

export default Shows;
