import { createSlice } from '@reduxjs/toolkit';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friendsAreChanged: false,
    friendsIds: [],
    friends: [],
    searchValue: null,
    searchResult: [],
  },
  reducers: {
    replaceFriends(state, action) {
      state.friends = action.payload;
      state.friendsIds = action.payload.map(friend => friend._id);
    },
    addFriend(state, action) {
      state.friendsAreChanged = true;
      state.friendsIds.push(action.payload._id);
      state.friends.push(action.payload);
    },
    removeFriend(state, action) {
      state.friendsAreChanged = true;
      state.friendsIds = state.friendsIds.filter(id => id !== action.payload._id);
      state.friends = state.friends.filter(friend => friend._id !== action.payload._id);
    },
    replaceSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    replaceSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    removeFriendFromSearch(state, action) {
      state.searchResult = state.searchResult.filter(friend => friend._id !== action.payload._id)
    },
  }
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice;
