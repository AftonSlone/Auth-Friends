import { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

import Friend from "./Friend";

export default function FriendsList(props) {
  const { setFriendToEdit } = props;
  const history = useHistory();
  const [friendData, setFriendData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [friendDeleted, setFriendDeleted] = useState(false);

  const onClick = () => {
    history.push("/FriendForm");
  };

  useEffect(() => {
    setloading(true);
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        setFriendData(res.data);
        setloading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, [friendDeleted]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {friendData.map((friend) => {
        return (
          <Friend
            friendDeleted={friendDeleted}
            setFriendDeleted={setFriendDeleted}
            setFriendToEdit={setFriendToEdit}
            data={friend}
          />
        );
      })}
      <button onClick={onClick}>Add Friend</button>
    </div>
  );
}
