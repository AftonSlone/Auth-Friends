import { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";

import FriendsList from "./components/FriendsList";
import Login from "./components/Login";
import FriendForm from "./components/FriendForm";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [friendToEdit, setFriendToEdit] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <PrivateRoute
          path="/friendslist"
          component={() => <FriendsList setFriendToEdit={setFriendToEdit} />}
        />
        <PrivateRoute
          path="/friendForm"
          component={() => (
            <FriendForm
              setFriendToEdit={setFriendToEdit}
              friendToEdit={friendToEdit}
            />
          )}
        />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}
