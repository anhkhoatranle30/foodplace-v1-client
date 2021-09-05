import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import favoriteBg from "../../static/images/favorite-background.svg";
import FavoriteCarousel from "./favoriteCarousel";
import { useSelector } from "react-redux";
import placeApi from "./../../apis/placeApi";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";

const useStyles = makeStyles({
  blobBackground: {
    position: "relative",
    backgroundImage: `url(${favoriteBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
  },
  linearLoading: {
    width: "100%",
  },
});

export default function FavoriteSection() {
  const classes = useStyles();

  const [topFavorites, setTopFavorites] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    async function fetchTopFavorites() {
      setLoading(true);
      try {
        const response = await placeApi.fetchTop9Favorites(token);
        setTopFavorites(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    }

    fetchTopFavorites();
  }, [token]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary" className={classes.title}>
          Top Favorites :
        </Typography>
      </Grid>
      <Grid item container alignItems="center" justifyContent="center" xs={12}>
        {/* List card here */}
        {topFavorites.length > 0 ? (
          <FavoriteCarousel topFavorites={topFavorites} />
        ) : isLoading ? (
          <LinearProgress className={classes.linearLoading} />
        ) : (
          <EmptyPlaceholder
            title="No favorite found!"
            body="Go to Places tab and like some places :3"
          />
        )}
      </Grid>
      <p>{error?.message}</p>
    </Grid>
  );
}
