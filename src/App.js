import React, { useEffect } from "react";
import "@fontsource/roboto";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/index";
import { fetchAllCategoriesAction } from "./app/slices/categorySlice";

function App() {
  const isUserLoggedIn = useSelector(
    (state) => state.user.status === "success"
  );
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchAllCategoriesAction(token));
    }
  }, [isUserLoggedIn, dispatch, token]);

  return (
    <BrowserRouter>
      <NavBar />
      {isUserLoggedIn ? <AuthenticatedRoute /> : <UnauthenticatedRoute />}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
