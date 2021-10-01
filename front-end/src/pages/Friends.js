import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchFriendsData, sendFriendsData } from '../store/friendsRequestActions';
import { friendsActions } from '../store/friendsSlice';
import FriendList from '../components/FriendList';
import Search from '../components/UI/Search';

let isSearchActive = false;
let searchValue = null;

function Friends() {
  const store = useSelector(state => state.friends);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchFriendsData());
  }, [dispatch]);

  const search = value => {
    isSearchActive = true;
    searchValue = value;
    dispatch(friendsActions.replaceSearchValue(value));
    dispatch(fetchFriendsData(value));
  };

  const clearSearch =() => {
    isSearchActive = false;
    dispatch(friendsActions.replaceSearchValue(null));
    dispatch(fetchFriendsData(null));
  };

  function addFriendHandler(friend) {
    dispatch(friendsActions.addFriend(friend));
    dispatch(friendsActions.removeFriendFromSearch(friend));
    dispatch(sendFriendsData('add', friend._id));
  }

  function removeFriendHandler(friend) {
    dispatch(friendsActions.removeFriend(friend));
    dispatch(sendFriendsData('remove', friend._id));
  }

  return <section>
    <Search 
      title="Friends" 
      onSearch={search} 
      onClearSearch={clearSearch} 
      searchNotEmpty={isSearchActive}/>
    {isSearchActive && <h1>Search Result for "{searchValue}"</h1>}
    <FriendList 
      friends={isSearchActive ? store.searchResult : store.friends} 
      isSearchActive={isSearchActive} 
      onAddFriend={addFriendHandler}
      onRemoveFriend={removeFriendHandler}
    />
  </section>
}

export default Friends;
