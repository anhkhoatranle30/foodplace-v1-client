import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userApi from '../../apis/userApi';
import Separator from '../../components/Separator';
import { STATUS } from '../../constant';
import ErrorImg from '../../static/images/email-verification-error.svg';
import Img from '../../static/images/email-verification-notification.svg';
import SuccessImg from '../../static/images/email-verification-success.svg';

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
  form: {
    marginTop: '10px',
  },
});

export default function EmailVerification() {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOtp = async () => {
      try {
        await userApi.getOtpThroughEmail(token);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    getOtp();
  }, [token]);

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
          <Grid
            className={classes.error}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography variant="h4">
                Error : {error?.message}. Please try again later!
              </Typography>
            </Grid>
            <img
              className={classes.img}
              src={ErrorImg}
              alt="failed-email-verification"
            />
          </Grid>
        );
      }
      case STATUS.SUCCESS: {
        return (
          <Grid
            className={classes.success}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid container alignItems="center" justifyContent="center">
              <Typography variant="h4">
                Congratulations! You have successfully registered.
                <Button color="primary" component={Link} to="/">
                  Login your account.
                </Button>
              </Typography>
            </Grid>
            <img
              className={classes.img}
              src={SuccessImg}
              alt="successful-email-verification"
            />
          </Grid>
        );
      }
      default: {
        return (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1">
              You are way to go. There is only one more step before you can use
              our app. Please check your email for OTP code.
            </Typography>
            <form className={classes.form}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField id="otp-input" label="OTP" variant="outlined" />
                <Separator />
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
            <img
              className={classes.img}
              src={Img}
              alt="email-verification-notification"
            />
          </Grid>
        );
      }
    }
  };

  return (
    <Container>
      <Grid
        className={classes.root}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3">Email Verification</Typography>
        {renderBody()}
      </Grid>
    </Container>
  );
}
