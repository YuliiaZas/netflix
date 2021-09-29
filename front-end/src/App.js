

// import logo from './logo.svg';
// import './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import AppRouter from './components/AppRouter';
import { fetchShowsData, fetchLikedShowsData, sendLikedShowsData } from './store/showsRequestActions'

let isInitial = true;

function App() {
  const shows = useSelector(state => state.shows);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchShowsData());
    // dispatch(fetchLikedShowsData());
  }, [dispatch]);
  
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (shows.changed) {
      console.log('send----')
      dispatch(sendLikedShowsData(shows.likedShowsIds));

    }
  }, [shows.likedShowsIds, dispatch])

  return (
    // <div>
      <AppRouter />
    // </div>
  );
}
  
  export default App;
  
  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>