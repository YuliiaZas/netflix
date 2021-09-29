import { useSelector } from 'react-redux';
import ShowCard from './ShowCard';

const ShowList = props => {
  const currentShows = useSelector(state => state.shows.currentShows);
  return (
    <section className="shows-card-grid">
      {currentShows.map(show => (
        <ShowCard show={show} key={show.id}/>
      ))}
    </section>
  );
}

export default ShowList;
