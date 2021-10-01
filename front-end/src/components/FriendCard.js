import classes from './FriendCard.module.css';

const FriendCard = props => {
  function addFriend() {
    props.addFriend(props.friend);
  }

  function removeFriend() {
    props.removeFriend(props.friend);
  }

  return (
    <div className={classes["friend-card"]}>
      <p>{props.friend.email}</p>
      <div>
        {props.isSearchActive && <button
            type="button"
            className="button button--main"
            onClick={addFriend}>
          Add Friend
        </button>}
        {!props.isSearchActive && <button
            type="button"
            className="button button--red"
            onClick={removeFriend}>
          Remove Friend
        </button>}
      </div>
    </div>
  );
};

export default FriendCard;
