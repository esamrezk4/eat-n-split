import React, { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    console.log("split bill", value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance: value } : friend
      )
    );
    setSelectedFriend(!selectedFriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

export default App;

function FriendList({ friends, handleSelectedFriend, selectedFriend }) {
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

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
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

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
    handleAddFriend(newFriend);

    setName("");
    setImage(image);
  }
  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}
    >
      <label>😍Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>👌Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");

  const paiedByFriend = bill ? bill - paidByUser : "";

  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSplitBill(whoIsPaying === "user" ? paiedByFriend : -paidByUser);

    if (!bill || !paidByUser) return;
  };

  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}
    >
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰Value Bill</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>👨‍🦰Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>👯‍♂️{selectedFriend.name} Expense</label>
      <input
        type="text"
        disabled
        value={paiedByFriend}
      />
      <label>😍Who is baying the bill?</label>
      <select
        type="text"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="Friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
