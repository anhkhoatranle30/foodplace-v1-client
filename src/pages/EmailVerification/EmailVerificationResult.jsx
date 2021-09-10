import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress, Container, Grid, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useQuery from '../../hooks/useQuery';
import { STATUS } from '../../constant';
import userApi from '../../apis/userApi';
import SuccessImg from '../../static/images/email-verification-success.svg';
import ErrorImg from '../../static/images/email-verification-error.svg';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
  success: {
    color: '#0B7FAB',
  },
  error: {
    color: 'red',
  },
  img: {
    width: '60%',
    minWidth: '300px',
    maxWidth: '500px',
    height: 'auto',
  },
});

export default function EmailVerificationResult() {
  const classes = useStyles();
  const query = useQuery();
  const token = query.get('token');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const verifyEmail = async () => {
    setStatus(STATUS.LOADING);
    try {
      await userApi.verifyEmail(token);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setStatus(STATUS.ERROR);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  const renderBody = () => {
    switch (status) {
      case STATUS.LOADING: {
        return (
          <>
            <CircularProgress />
            <Typography>Please wait for us to verify...</Typography>
          </>
        );
      }
      case STATUS.ERROR: {
        return (
          <Grid className={classes.error} container direction="column" alignItems="center" justifyContent="center">
            <Grid container alignItems="center" justifyContent="center">
              <Typography variant="h4">
                Error :
                {' '}
                {error?.message}
                . Please try again later!
              </Typography>
            </Grid>
            <img className={classes.img} src={ErrorImg} alt="failed-email-verification" />
          </Grid>
        );
      }
      default: {
        return (
          <Grid className={classes.success} container direction="column" alignItems="center" justifyContent="center">
            <Grid container alignItems="center" justifyContent="center">
              <Typography variant="h4">
                Congratulations! You have successfully registered.
                <Button color="primary" component={Link} to="/">
                  Login your account.
                </Button>
              </Typography>
            </Grid>
            <img className={classes.img} src={SuccessImg} alt="successful-email-verification" />
          </Grid>
        );
      }
    }
  };

  return (
    <Container>
      <Grid className={classes.root} container direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h3">Email Verification</Typography>
        {renderBody()}
      </Grid>
    </Container>
  );
}
