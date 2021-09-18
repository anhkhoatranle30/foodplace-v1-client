import '@fontsource/roboto';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fetchAllCategoriesAction } from './app/slices/categorySlice';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import UnauthenticatedRoute from './components/UnauthenticatedRoute/index';
import EmailVerification from './pages/EmailVerification';

function App() {
  const isUserLoggedIn = useSelector(
    (state) => state.user.status === 'success'
  );
  const isUserEmailVerified = useSelector(
    (state) => state.user.data.confirmed === true
  );
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchAllCategoriesAction(token));
    }
  }, [isUserLoggedIn, dispatch, token]);

  const render = () => {
    if (isUserLoggedIn) {
      return isUserEmailVerified ? (
        <AuthenticatedRoute />
      ) : (
        <EmailVerification />
      );
    }
    return <UnauthenticatedRoute />;
  };

  return (
    <BrowserRouter>
      <NavBar />
      {render()}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
