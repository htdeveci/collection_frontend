import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

const NavBarButton = ({ variant = "h6", onClick, to, children }) => {
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname === to);
  }, [location, to]);

  return (
    <Typography
      variant={variant}
      noWrap
      component={NavLink}
      onClick={onClick}
      to={to}
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: active ? theme.palette.secondary.main : "inherit",
        textDecoration: "none",
        "&:hover": {
          color: theme.palette.secondary.main,
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default NavBarButton;
