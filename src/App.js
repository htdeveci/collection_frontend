import { Routes, Route, Navigate } from "react-router-dom";

import classes from "./App.module.css";
import NavBar from "./shared/components/Navigation/NavBar";
import Collection from "./collections/pages/Collection";
import Home from "./shared/pages/Home";
import Item from "./items/pages/Item";
import Media from "./items/pages/Media";
import Profile from "./users/pages/Profile";
import Authenticate from "./users/pages/Authenticate";
import useAuth from "./shared/hooks/auth-hook";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar } from "@mui/material";
import Favorites from "./shared/pages/Favorites";
import { useSelector } from "react-redux";

function App() {
  const { token } = useAuth();

  const routes = (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      {!token && <Route path="/authenticate" element={<Authenticate />} />}
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/collection/:collectionId" element={<Collection />} />
      <Route path="/item/:itemId/media/:mediaName" element={<Media />} />
      <Route path="/item/:itemId" element={<Item />} />
      <Route path="*" element={<Navigate replace to="/home" />} />
    </Routes>
  );

  /* if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/collection/:collectionId" element={<Collection />} />
        <Route path="/item/:itemId/media/:mediaName" element={<Media />} />
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
        <Route path="/item/:itemId/media/:mediaName" element={<Media />} />
        <Route path="/item/:itemId" element={<Item />} />
      </Routes>
    );
  } */

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fd9801" },
      secondary: { main: "#198391" },
      success: { main: "#388e3c" },
      error: { main: "#fc3628" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          padding: "0 !important",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <NavBar />
        {routes}
      </Container>
      {/* <div
        className={classes.appMain}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <NavBar />
        {routes}
      </div> */}
    </ThemeProvider>
  );
}

export default App;
