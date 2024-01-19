import { useState } from "react";
import "./App.css";

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
    name: "Michael",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShow() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // console.log(friend);
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    // console.log(value);
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value } : friend))
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShow}>
          {showAddFriend ? `close` : `Add Friend`}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill= {handleSplitBill} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  console.log(selectedFriend);
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3> {friend.name} </h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button onClick={() => onSelection(friend)}> 
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: id,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <div>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label> 👫Friend name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label> 🌄Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button> Add</Button>
      </form>
    </div>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();
    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "you" ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> SPLIT A BILL WITH {selectedFriend.name} </h2>

      <label> 💸 Bill Value </label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label> 💸 Your expense </label>
      <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />

      <label> 💸 {selectedFriend.name}'s expense </label>
      <input type="text" disabled value={paidByFriend} />

      <label> 🤷‍♂️ Who is paying the bill </label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button> Split bill</Button>
    </form>
  );
}

export default App;
