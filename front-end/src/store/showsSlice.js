import { createSlice } from '@reduxjs/toolkit';

const LIMIT = 12;

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    isAuth: Boolean(localStorage.getItem('token')),
    changed: false,
    page: 1,
    pageMax: 1,
    offset: 0,
    allShows: [],
    currentShows: [],
    likedShowsIds: [],
    likedShows: [],
  },
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    replaceAllShows(state, action) {
      if (state.isAuth) {
        console.log(state, action)
        state.allShows = action.payload;
        state.pageMax = Math.ceil(action.payload.length / LIMIT);
      }
    },
    replacePage(state, action) {
      const page = action.payload;
      if (page < 1) {
        state.page = 1;
      } else if (page > state.pageMax) {
        state.page = state.pageMax;
      } else {
        state.page = page;
      }
      state.offset = (state.page - 1) * LIMIT;
    },
    replaceCurrentShows(state) {
      if (state.isAuth) {
        let startIndex = state.offset;
        let endIndex = state.offset + LIMIT;
        state.currentShows = state.allShows.slice(startIndex, endIndex);
      }
    },
    replaceLikedShowsIds(state, action) {
      if (state.isAuth) {
        state.likedShowsIds = action.payload;
      }
    },
    replaceLikedShows(state) {
      if (state.isAuth) {
        state.likedShows = state.likedShowsIds.map(id => {
          return state.allShows.find(show => show.id === id)
        });
      }
    },
    likeShow(state, action) {
      state.changed = true;
      state.likedShowsIds.push(action.payload);
      state.likedShows.push(state.currentShows.find(item => {
        return item.id === action.payload
      }));
    },
    unlikeShow(state, action) {
      state.changed = true;
      state.likedShowsIds = state.likedShowsIds.filter(id => id !== action.payload);
      state.likedShows = state.likedShows.filter(show => show.id !== action.payload);
    }
  }
});

export const showsActions = showsSlice.actions;

export default showsSlice;
