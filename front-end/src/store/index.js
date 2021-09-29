import { configureStore} from '@reduxjs/toolkit';

import showsSlice from './showsSlice';

const store = configureStore({
  reducer: {
    shows: showsSlice.reducer,
  }
});

export default store;