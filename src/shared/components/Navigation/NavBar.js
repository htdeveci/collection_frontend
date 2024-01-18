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
        <text>
          This website is under construction and is currently running on free
          servers.
          <br />
          Due to these circumstances, you may not be able to use the website
          properly and images may not be displayed as intended.
        </text>
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
    /*  <header className={classes.header}>
      <nav>
        <ul>
          <li className={classes.homeLink}>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to={`/profile/${userId}`}
              >
                Profile
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Button onClick={logoutHandler}>LOG OUT</Button>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/authenticate"
              >
                Authenticate
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header> */
  );
};

export default NavBar;
