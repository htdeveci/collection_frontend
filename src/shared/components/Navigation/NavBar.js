import { useSelector, useDispatch } from "react-redux";
import { AppBar, Box, Toolbar } from "@mui/material";

import classes from "./NavBar.module.css";
import { authAction } from "../../store/auth";
import NavBarButton from "./NavBarButton";
import { APP_NAME } from "../../utils/global-constants";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };

  return (
    <>
      <div className={classes.construction}>
        <p>
          This website is currently under construction. You may not be able to
          use the website properly.
          <br />
          <b>
            Therefore, existing databases will be deleted when published
            properly.
          </b>
        </p>
      </div>

      <AppBar position="static" sx={{ marginBottom: 0 }} enableColorOnDark>
        <Toolbar className={classes.toolbar}>
          <NavBarButton variant="h5" to="/">
            {APP_NAME.toUpperCase()}
          </NavBarButton>

          <Box className={classes.menu}>
            {token && (
              <>
                <NavBarButton to={`/profile/${userId}`}>Profile</NavBarButton>
                <NavBarButton to={`/favorites`}>Favorites</NavBarButton>
              </>
            )}

            {token && (
              <NavBarButton onClick={logoutHandler}>Logout</NavBarButton>
            )}

            {!token && (
              <NavBarButton to="/authenticate">Authenticate</NavBarButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
