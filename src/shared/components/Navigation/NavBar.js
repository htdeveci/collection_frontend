import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NavBar.module.css";
import Button from "../FormElements/Button";
import { authAction } from "../../store/auth";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };

  return (
    <header className={classes.header}>
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
                to="/profile/asafgwe"
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
    </header>
  );
};

export default NavBar;
