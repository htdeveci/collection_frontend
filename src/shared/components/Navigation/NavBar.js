import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NavBar.module.css";
import { authAction } from "../../store/auth";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const theme = useTheme();

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 0 }} enableColorOnDark>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          noWrap
          component={NavLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          CASGLIAD
        </Typography>

        <Box className={classes.menu}>
          {token && (
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to={`/profile/${userId}`}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "&.active": {
                  color: theme.palette.secondary.dark,
                },
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              Profile
            </Typography>
          )}

          {token && (
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              onClick={logoutHandler}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              Logout
            </Typography>
          )}

          {!token && (
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/authenticate"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "&.active": {
                  color: theme.palette.secondary.dark,
                },
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              Authenticate
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
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
