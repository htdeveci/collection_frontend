import { Routes, Route, Navigate } from "react-router-dom";

import classes from "./App.module.css";
import NavBar from "./shared/components/Navigation/NavBar";
import Collection from "./collections/pages/Collection";
import Home from "./shared/pages/Home";
import Item from "./items/pages/Item";
import Profile from "./users/pages/Profile";
import Authenticate from "./users/pages/Authenticate";
import useAuth from "./shared/hooks/auth-hook";

function App() {
  const { token } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/collection/:collectionId" element={<Collection />} />
        <Route path="/item/:itemId" element={<Item />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/collection/:collectionId" element={<Collection />} />
        <Route path="/item/:itemId" element={<Item />} />
      </Routes>
    );
  }

  return (
    <div className={classes.appMain}>
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
