import { useState } from "react";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function FriendForm(props) {
  const { friendToEdit, setFriendToEdit } = props;
  const history = useHistory();

  const initialFormData = {
    name: "",
    age: "",
    email: "",
  };
  const [formData, setFormData] = useState(
    friendToEdit ? friendToEdit : initialFormData
  );

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (friendToEdit) {
      axiosWithAuth().put(`/friends/${friendToEdit.id}`, formData);
    } else {
      axiosWithAuth().post("/friends", formData);
    }
    setFriendToEdit(null);
    history.push("/FriendsList");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
