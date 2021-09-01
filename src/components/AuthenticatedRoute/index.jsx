import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import HomePage from "./../../pages/HomePage";
import MaintenancePage from "../../pages/MaintenancePage";
import PlaceList from "../../pages/Place/PlaceList";
import PlaceCreate from "../../pages/Place/PlaceCreate";
import AboutPage from "../../pages/AboutPage";
import CategoryList from "../../pages/Category/CategoryList";
import CategoryCreate from "../../pages/Category/CategoryCreate";

const useStyles = makeStyles({
  main: {
    width: "100%",
    minHeight: "100vh",
    marginTop: "10px",
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
        <Route exact path="/categories">
          <CategoryList />
        </Route>
        <Route exact path="/categories/new">
          <CategoryCreate />
        </Route>
        <Route path="*">
          <MaintenancePage />
        </Route>
      </Switch>
    </div>
  );
}
