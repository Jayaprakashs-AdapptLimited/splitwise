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
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShow() {
    setShowAddFriend((show) => !show);
 }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShow}>{showAddFriend ? `close` : `Add Friend`} </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}> {children} </button>;
}



function FriendList() {
  const friends = initialFriends;
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <div>
      <li>
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
        <Button> Select</Button>
      </li>
    </div>
  );
}

function FormAddFriend() {
  return (
    <div>
      <form className="form-add-friend">
        <label> 👫Friend name </label>
        <input type="text" />

        <label> 🌄Image URL</label>
        <input type="text" />

        <Button> Add</Button>
      </form>
    </div>
  );
}

function FormSplitBill() {
  return (<form className="form-split-bill"> 
    <h2> SPLIT A BILL WITH friend </h2>

    <label> 💸 Bill Value </label>
    <input type="number" />

    <label> 💸 Your expense </label>
    <input type="number" />

    <label> 💸 Friend's expense </label>
    <input type="number" disabled/>

    <label> 🤷‍♂️ Who is paying the bill </label>
<select>
  <option value="you">You</option>
  <option value="friend">Friend</option>
</select>

<Button> Split bill</Button>
  </form>
  )
}

export default App;
