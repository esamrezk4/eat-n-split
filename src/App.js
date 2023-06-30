import React, { useState } from "react";
import "./index.css";
import FriendList from "./FriendList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitFriend";
import Button from "./Button";

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

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
    console.log(friend);
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
