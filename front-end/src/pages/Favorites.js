import { useSelector } from 'react-redux';

import ShowList from '../components/ShowList';

function Favorites() {
  const currentShows = useSelector(state => state.shows.likedShows);

  return (
    currentShows.length 
      ? <ShowList shows={currentShows} />
      : <p>Please, put some shows to your library on the "Shows" tab</p>
  );
}

export default Favorites;
