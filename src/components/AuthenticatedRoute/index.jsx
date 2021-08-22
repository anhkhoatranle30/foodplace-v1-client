import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import HomePage from "./../../pages/HomePage";
import MaintenancePage from "../../pages/MaintenancePage";
import PlaceList from "../../pages/Place/PlaceList";
import PlaceCreate from "../../pages/Place/PlaceCreate";
import AboutPage from "../../pages/AboutPage";

const useStyles = makeStyles({
  main: {
    width: "100%",
  },
});

export default function AuthenticatedRoute() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/places">
          <PlaceList />
        </Route>
        <Route path="/places/new">
          <PlaceCreate />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <MaintenancePage />
        </Route>
      </Switch>
    </div>
  );
}
