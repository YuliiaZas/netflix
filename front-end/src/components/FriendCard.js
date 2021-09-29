const FriendCard = props => {
  return (
    <div className="friend-card">
      <p>{props.friend.username || props.friend.email}</p>
      <div></div>
    </div>
  )
}