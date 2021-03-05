import React from "react";
import { useHistory } from "react-router-dom";
import { forceUpdate } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Friend(props) {
  const { data, setFriendToEdit, friendDeleted, setFriendDeleted } = props;
  const history = useHistory();
  const edit = (e) => {
    e.preventDefault();
    setFriendToEdit(data);
    history.push("/FriendForm");
  };

  const deleteFriend = (e) => {
    e.preventDefault();
    axiosWithAuth().delete(`/friends/${data.id}`);
    setFriendDeleted(!friendDeleted);
  };

  return (
    <div>
      <h2>Name: {data.name}</h2>
      <h3>Age: {data.age}</h3>
      <h3>Email: {data.email}</h3>
      <button onClick={edit}>Edit</button>
      <button onClick={deleteFriend}>Delete</button>
    </div>
  );
}
