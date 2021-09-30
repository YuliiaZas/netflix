import { showsActions } from './showsSlice';

export const fetchShowsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://api.tvmaze.com/shows');
      if (!response.ok) {
        throw new Error('Could not fetch shows data');
      }
      return await response.json();
    };

    try {
      const showsData = await fetchData();
      dispatch(showsActions.replaceAllShows(showsData));
      dispatch(showsActions.replaceCurrentShows());
    } catch (error) {
      console.log(error);
    }
  }
}

export const fetchLikedShowsData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
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
      const likedShowsIds = await fetchData();
      dispatch(showsActions.replaceLikedShowsIds(likedShowsIds));
    } catch (error) {
      console.log(error)
    }
  }
}

export const sendLikedShowsData = showsData => {
  return async () => {
    // dispatch();
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