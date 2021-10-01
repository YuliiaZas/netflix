import { showsActions } from './showsSlice';

const fetchData = async (value) => {
  const url = value 
    ? `https://api.tvmaze.com/search/shows?q=${value}`
    : 'https://api.tvmaze.com/shows';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not fetch shows data');
  }
  return await response.json();
};

export const fetchShowsData = () => {
  return async (dispatch) => {
    try {
      const shows = await fetchData();
      dispatch(showsActions.replaceAllShows(shows));
    } catch (error) {
      console.log(error);
    }
  }
}

export const fetchShowsDataForSearch = (value) => {
  return async (dispatch) => {
    try { 
      if (value === null) {
        dispatch(showsActions.replaceSearchResult([]));
        return;
      }
      const showsData = await fetchData(value);
      const shows = showsData.map(item => item.show)
        .filter(show => show.status !== 'In Development');
      dispatch(showsActions.replaceSearchResult(shows));
    } catch (error) {
      console.log(error);
    }
  }
}

export const fetchLikedShowsData = (userId) => {
  return async (dispatch) => {
    const fetchLikedShows = async () => {
      const url = userId ? `/api/shows/${userId}` : '/api/shows';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Could not fetch liked shows data');
      }
      return await response.json();
    };

    try {
      const likedShowsIds = await fetchLikedShows();
      dispatch(showsActions.replaceLikedShowsIds(likedShowsIds));
    } catch (error) {
      console.log(error);
    }
  }
}

export const sendLikedShowsData = showsData => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch('/api/shows', {
        method: 'PUT',
        body: JSON.stringify(showsData),
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Sending likedShowsData failed.')
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  }
};