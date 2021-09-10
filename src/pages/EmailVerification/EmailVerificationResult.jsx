import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress, Container, Grid, Typography,
} from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useQuery from '../../hooks/useQuery';
import { STATUS } from '../../constant';
import userApi from '../../apis/userApi';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
  success: {
    color: '#0B7FAB',
  },
  img: {
    width: '300px',
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
      setError(err);
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
          <>
            <Error />
            <Typography>
              Error :
              {' '}
              {error.message}
              . Please try again later!
            </Typography>
          </>
        );
      }
      default: {
        return (
          <Grid className={classes.success} container alignItems="center" justifyContent="center">
            <CheckCircle />
            <Typography>
              Congratulations! You have successfully registered.
              <Button color="primary" component={Link} to="/">
                Login your account.
              </Button>
            </Typography>
          </Grid>
        );
      }
    }
  };

  return (
    <Container>
      <Grid className={classes.root} container direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h5">Email Verification</Typography>
        {renderBody()}
      </Grid>
    </Container>
  );
}
