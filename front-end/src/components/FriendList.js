import FriendCard from './FriendCard';

const FriendList = props => {
  const friends = props.friends;
  
  function onAddFriend(friend) {
    props.onAddFriend(friend);
  }

  function onRemoveFriend(friend) {
    props.onRemoveFriend(friend);
  }

  return <section>
      {friends.length === 0 
        && <p>Please, try to find your friend</p>}
      {friends.map(friend => (
        <FriendCard 
          friend={friend} 
          key={friend._id} 
          isSearchActive={props.isSearchActive}
          addFriend={onAddFriend}
          removeFriend={onRemoveFriend}
        />
      ))}
    </section>;
}

export default FriendList;
