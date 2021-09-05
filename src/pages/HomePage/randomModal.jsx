import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  NativeSelect,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import placeApi from "../../apis/placeApi";
import PlaceCard from "../../components/PlaceCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 350,
    margin: "1px auto",
    padding: "0px 10px 10px 10px",
    backgroundColor: "#F4F4F8",
  },
  body: {
    margin: "5px 0px",
  },
}));

export default function RandomModal({ isOpen, onClose }) {
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [place, setPlace] = useState(null);
  const token = useSelector((state) => state.user.token);

  const handleFormSubmit = async (data) => {
    setStatus("loading");

    try {
      const placeResponse = await placeApi.fetchRandom(token);
      const placeData = placeResponse.data;
      setPlace(placeData);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setStatus("error");
    }
  };

  const renderBody = () => {
    switch (status) {
      case "loading":
        return (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12}>
              Loading...
            </Grid>
          </Grid>
        );
      case "error":
        return `Error: ${errorMessage}`;
      case "success":
        return <PlaceCard place={place} />;
      default:
        return "Click the random button or you can choose a category";
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              id="random-place-form"
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category-native-helper">
                      Category
                    </InputLabel>
                    <NativeSelect
                      {...register("category")}
                      inputProps={{
                        name: "category",
                        id: "category-native-helper",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={10}>Ăn vặt</option>
                      <option value={20}>Ăn chính</option>
                      <option value={30}>Món tây</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    form="random-place-form"
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Random
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid className={classes.body} item xs={12}>
            {renderBody()}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
