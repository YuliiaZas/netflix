import { useSelector } from 'react-redux';

import ShowList from '../components/ShowList';

function Favorites() {
  const currentShows = useSelector(state => state.shows.likedShows);

  return <ShowList shows={currentShows} />;
}

export default Favorites;
