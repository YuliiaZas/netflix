import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchShowsData, fetchLikedShowsData, sendLikedShowsData, fetchShowsDataForSearch } from '../store/showsRequestActions';
import { showsActions } from '../store/showsSlice';
import ShowList from '../components/ShowList';
import Pagination from '../components/UI/Pagination';
import Search from '../components/UI/Search';

let isSearchActive = false;
let wasSearchActive = false;
let searchValue = null;

function Shows() {
  const store = useSelector(state => state.shows);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchShowsData());
    dispatch(fetchLikedShowsData());
  }, [dispatch]);
  
  useEffect(() => {
    if (store.likedShowsAreChanged) {
      dispatch(sendLikedShowsData(store.likedShowsIds));
    }
  }, [store.likedShowsIds, dispatch]);

  useEffect(() => {
    if (store.allShows.length && store.likedShowsIds.length) {
      dispatch(showsActions.replaceLikedShows(store.likedShowsIds));
    }
  }, [store.allShows, store.likedShowsIds, dispatch]);

  useEffect(() => {
    if (store.allShows.length || store.searchResult.length) {
      dispatch(showsActions.replaceCurrentShows(isSearchActive));
    }
  }, [store.page, store.allShows, store.searchResult, dispatch]);


  useEffect(() => {
    if (wasSearchActive) {
      dispatch(showsActions.updatePageInfo());
    }
  }, [store.searchResult, dispatch]);

  const changePage = page => {
    dispatch(showsActions.replacePage(page));
  };

  const search = value => {
    isSearchActive = true;
    wasSearchActive = true;
    searchValue = value;
    dispatch(showsActions.replaceSearchValue(value));
    dispatch(fetchShowsDataForSearch(value));
  };

  const clearSearch =() => {
    isSearchActive = false;
    dispatch(showsActions.replaceSearchValue(null));
    dispatch(fetchShowsDataForSearch(null));
  };

  return <section>
    <Search 
      title="Shows" 
      onSearch={search} 
      onClearSearch={clearSearch} 
      searchNotEmpty={isSearchActive}/>
    {isSearchActive && <h1>Search Result for "{searchValue}"</h1>}
    <ShowList shows={store.currentShows} />
    <Pagination changePage={changePage} />
  </section>;
}

export default Shows;
