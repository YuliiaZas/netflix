import ShowCard from './ShowCard';

import classes from './ShowList.module.css';

const ShowList = props => {
  const currentShows = props.shows;
  return (
    <section className={classes["shows-card-grid"]}>
      {currentShows.map(show => (
        <ShowCard show={show} key={show.id}/>
      ))}
    </section>
  );
}

export default ShowList;
