import Button from "./Button";
export default function Friend({
  friend,
  handleSelectedFriend,
  selectedFriend,
}) {
  const isSelected = selectedFriend?.id === friend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img
        src={friend.image}
        alt={friend.name}
      />
      <h3>{friend.name}</h3>
      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
      <span>
        {friend.balance < 0 && (
          <p className="red">{`you owe ${friend.name} ${friend.balance}`}</p>
        )}
        {friend.balance > 0 && (
          <p className="green">{`you owe ${friend.name} ${friend.balance}`}</p>
        )}
        {friend.balance === 0 && <p>{`you and ${friend.name} are even`}</p>}
      </span>
    </li>
  );
}
