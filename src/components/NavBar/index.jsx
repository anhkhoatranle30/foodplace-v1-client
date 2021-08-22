import { AppBar, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../static/images/logo.png";
import MenuButton from "./menuButton";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  logo: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logoImg: {
    height: "48px",
    width: "auto",
  },
  tabs: {
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
    },
  },
  tab: {
    fontWeight: "700",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/places")) {
      setValue(2);
    } else if (path.includes("/categories")) {
      setValue(1);
    } else if (path === "/") {
      setValue(0);
    } else {
      setValue(-1);
    }
  }, [location.pathname]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="default">
      <div className={classes.toolBar}>
        <Link className={classes.logo} to="/" onClick={() => setValue(0)}>
          <img className={classes.logoImg} alt="logo" src={logo} />
        </Link>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          <Tab className={classes.tab} label="Home" component={Link} to="/" />

          <Tab
            className={classes.tab}
            label="Categories"
            component={Link}
            to="/categories"
          />

          <Tab
            className={classes.tab}
            label="Places"
            component={Link}
            to="/places"
          />
        </Tabs>
        <MenuButton />
      </div>
    </AppBar>
  );
}
