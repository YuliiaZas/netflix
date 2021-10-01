import { friendsActions } from './friendsSlice';

export const fetchFriendsData = (searchValue) => {
  return async (dispatch) => {
    const fetchFriends = async () => {
      const url = searchValue 
        ? `/api/friends/search/${searchValue}` 
        : '/api/friends';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Could not fetch friends data');
      }
      return await response.json();
    };

    try {
      const friends = await fetchFriends();
      if (searchValue) {
        dispatch(friendsActions.replaceSearchResult(friends));
      } else {
        dispatch(friendsActions.replaceFriends(friends));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const sendFriendsData = (type, friendId) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(`/api/friends/${type}/${friendId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Sending friendsData failed.')
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  }
};