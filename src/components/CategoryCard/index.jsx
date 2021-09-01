import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Apps, ArrowForward } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import categoryApi from "../../apis/categoryApi";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "180px",
    maxWidth: "200px",
    padding: "10px",
    margin: "5px",
    "&:hover": {
      boxShadow: "5px 5px 25px 5px rgba(0,0,0,0.27)",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  icon: {
    width: "50px",
    height: "auto",
  },
}));

export default function CategoryCard(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [nOPlaces, setNOPlaces] = useState(-1);

  const { category, isSkeleton } = props;

  useEffect(() => {
    async function fetchPlacesCount() {
      try {
        const response = await categoryApi.fetchNumberOfPlaces(
          token,
          category._id
        );
        setNOPlaces(response.data.count);
      } catch (error) {
        setNOPlaces(0);
        console.log(error);
      }
    }

    fetchPlacesCount();
  }, [category, token]);

  return (
    <Paper className={classes.root}>
      <Grid spacing={2} container direction="column" justifyContent="center">
        <Grid item>
          <Apps />
        </Grid>
        <Grid item>
          <Typography component="div">
            <Box fontWeight={900} fontSize="h5.fontSize">
              {isSkeleton ? <Skeleton /> : category.name}
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div">
            <Box color="text.secondary">
              {isSkeleton || nOPlaces === -1 ? (
                <Skeleton />
              ) : (
                `${nOPlaces} places`
              )}
            </Box>
          </Typography>
        </Grid>
        <Grid item container justifyContent="flex-end">
          {isSkeleton ? (
            <IconButton disabled>
              <ArrowForward />
            </IconButton>
          ) : (
            <IconButton>
              <ArrowForward color="primary" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
