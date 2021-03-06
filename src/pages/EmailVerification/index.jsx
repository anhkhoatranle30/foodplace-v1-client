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
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../apis/userApi';
import { logoutUserAction } from '../../app/slices/userSlice';
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
  const dispatch = useDispatch();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

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

  const handleOtpFormSubmit = async (data) => {
    const { otp } = data;
    setStatus(STATUS.LOADING);
    try {
      await userApi.verifyEmail(token, otp);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setStatus(STATUS.ERROR);
      setError(err.response.data);
    }
  };

  const handleLogoutUser = () => {
    dispatch(logoutUserAction());
  };

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
                Error : {error?.message}. Please login to your account again to
                get another OTP!
              </Typography>
            </Grid>
            <Button
              onClick={() => handleLogoutUser()}
              variant="contained"
              color="secondary"
              size="large"
            >
              Login again
            </Button>
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
                <Button
                  onClick={() => handleLogoutUser()}
                  color="primary"
                  variant="contained"
                >
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
            <form
              onSubmit={handleSubmit(handleOtpFormSubmit)}
              id="otp-form"
              className={classes.form}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  id="otp-input"
                  label="OTP"
                  variant="outlined"
                  {...register('otp')}
                />
                <Separator />
                <Button
                  type="submit"
                  form="otp-form"
                  variant="contained"
                  color="primary"
                >
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
