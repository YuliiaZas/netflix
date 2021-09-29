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
      
    }
  }
}

export const fetchLikedShowsData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await userId ? fetch(`api/shows/${userId}`) : fetch('api/shows');
      if (!response.ok) {
        throw new Error('Could not fetch liked shows data');
      }
      return await response.json();
    };

    try {
      const likedShowsIds = await fetchData();
      dispatch(showsActions.replaceLikedShowsId(likedShowsIds));
      dispatch(showsActions.replaceLikedShows());
    } catch (error) {
      
    }
  }
}

export const sendLikedShowsData = showsData => {
  return async (dispatch) => {
    dispatch();
    const sendRequest = async () => {
      const response = await fetch('api/shows', {
        method: 'PUT',
        body: JSON.stringify(showsData)
      });
      if (!response.ok) {
        throw new Error('Sending showsData failed.')
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      
    }
  }
};