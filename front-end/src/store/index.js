import { configureStore} from '@reduxjs/toolkit';

import showsSlice from './showsSlice';
import friendsSlice from './friendsSlice';

const store = configureStore({
  reducer: {
    shows: showsSlice.reducer,
    friends: friendsSlice.reducer,
  }
});

export default store;
