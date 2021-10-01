import { createSlice } from '@reduxjs/toolkit';

const LIMIT = 12;

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    isAuth: Boolean(localStorage.getItem('token')),
    likedShowsAreChanged: false,
    page: 1,
    pageMax: 1,
    offset: 0,
    previousPageData: {
      page: null,
      pageMax: null,
      offset: null,
    },
    allShows: [],
    currentShows: [],
    likedShowsIds: [],
    likedShows: [],
    searchValue: null,
    searchResult: [],
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
    replaceCurrentShows(state, action) {
      const isSearchActive = action.payload;
      if (state.isAuth) {
        let startIndex = state.offset;
        let endIndex = state.offset + LIMIT;
        if (isSearchActive) {
          state.currentShows = state.searchResult.slice(startIndex, endIndex);
        } else {
          state.currentShows = state.allShows.slice(startIndex, endIndex);
        }
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
      state.likedShowsAreChanged = true;
      state.likedShowsIds.push(action.payload);
      state.likedShows.push(state.currentShows.find(item => {
        return item.id === action.payload
      }));
    },
    unlikeShow(state, action) {
      state.likedShowsAreChanged = true;
      state.likedShowsIds = state.likedShowsIds.filter(id => id !== action.payload);
      state.likedShows = state.likedShows.filter(show => show.id !== action.payload);
    },
    replaceSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    replaceSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    updatePageInfo(state) {
      if (state.searchValue !== null) {
        if (!state.previousPageData.page) {
          state.previousPageData = {
            page: state.page,
            pageMax: state.pageMax,
            offset: state.offset,
          };
        }

        state.page = 1;
        state.pageMax = Math.ceil(state.searchResult.length / LIMIT);
        state.offset = 0;
      } else {
        state.page = state.previousPageData.page;
        state.pageMax = state.previousPageData.pageMax;
        state.offset = state.previousPageData.offset;

        state.previousPageData = {
          page: null,
          pageMax: null,
          offset: null,
        };
      }
    },
  }
});

export const showsActions = showsSlice.actions;

export default showsSlice;
