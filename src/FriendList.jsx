import Friend from "./Friend";

export default function FriendList({
  friends,
  handleSelectedFriend,
  selectedFriend,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}
