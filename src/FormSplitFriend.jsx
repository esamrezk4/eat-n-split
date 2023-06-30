import Button from "./Button";
import { useState } from "react";
export default function FormSplitBill({ selectedFriend, handleSplitBill }) {
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
