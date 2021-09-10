/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUserAction } from '../../app/slices/userSlice';
import useFormStyles from '../../hooks/useFormStyle';
import { loginSchema } from '../../schemas/yup';
import banner from '../../static/images/banner-login.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '20px',
  },
  margin: {
    margin: theme.spacing(1),
  },
  banner: {
    height: 'auto',
  },
}));

export default function Login() {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (formData) => {
    dispatch(
      loginUserAction({ email: formData.email, password: formData.password }),
    );
  };

  return (
    <Container>
      {/* loading backdrop */}
      <Backdrop
        className={formClasses.backdrop}
        open={user.status === 'loading'}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        className={classes.root}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h5">WTFood Login</Typography>
        </Grid>

        <Grid item xs={12}>
          <img
            className={clsx(formClasses.textField, classes.banner)}
            alt="banner"
            src={banner}
          />
        </Grid>

        <Grid item xs={12}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            autoComplete="off"
            className={formClasses.root}
            id="loginForm"
          >
            <FormControl error={user.status === 'error'}>
              <FormHelperText>{user.error?.message}</FormHelperText>
            </FormControl>

            <FormControl
              variant="outlined"
              className={clsx(classes.margin, formClasses.textField)}
              error={!!errors.email}
            >
              <InputLabel htmlFor="outlined-input-email">Email</InputLabel>
              <OutlinedInput
                autoComplete="username"
                id="outlined-input-email"
                type="email"
                labelWidth={40}
                {...register('email')}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
            <FormControl
              className={clsx(classes.margin, formClasses.textField)}
              variant="outlined"
              error={!!errors.password}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                autoComplete="new-password"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
                labelWidth={70}
                {...register('password')}
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
            <Link to="/register">Register new account</Link>
            <Button
              className={clsx(classes.margin, formClasses.button)}
              variant="contained"
              color="primary"
              type="submit"
              form="loginForm"
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
