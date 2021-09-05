import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAction } from "../../../app/slices/categorySlice";
import { categorySchema } from "../../../schemas/yup";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CategoryCreate() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isLoadingOpen, setLoadingOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);

  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleFormSubmit = async (body) => {
    setLoadingOpen(true);
    try {
      const sth = await dispatch(
        postCategoryAction({
          token,
          body,
        })
      );
      if (sth.error) {
        setErrorOpen(true);
        setLoadingOpen(false);
      } else {
        setSuccessOpen(true);
        setLoadingOpen(false);
      }
    } catch (err) {
      setErrorOpen(true);
      setLoadingOpen(false);
    }
  };

  const handleSuccessClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };
  const handleErrorClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  return (
    <Container>
      {/* loading backdrop */}
      <Backdrop className={classes.backdrop} open={isLoadingOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* success snackbar */}
      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Successfully added new category!
        </Alert>
      </Snackbar>
      {/* error snackbar */}
      <Snackbar
        open={isErrorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          An error occurred! Please try later.
        </Alert>
      </Snackbar>

      {/* form */}
      <Grid container direction="column" justifyContent="center">
        <Grid item container justifyContent="center">
          <Typography component="div">
            <Box fontSize="h3.fontSize" fontWeight={700}>
              Create new Category
            </Box>
          </Typography>
        </Grid>
        <form
          id="create-categoryf-form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Grid container alignItems="center" justifyContent="space-around">
            <TextField
              id="new-category-name"
              label="Category name"
              variant="outlined"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              form="create-categoryf-form"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
