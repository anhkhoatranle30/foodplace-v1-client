import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccessTime as AccessTimeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Grade as GradeIcon,
  LocationOn as LocationOnIcon,
  Loyalty as LoyaltyIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import PlaceInfo from "./placeInfo";
import formatTime from "../../utils/formatTime";
import categoryApi from "./../../apis/categoryApi";
import { useSelector } from "react-redux";
import placeApi from "../../apis/placeApi";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "20px 0px",
  },
  button: {
    fontWeight: "bold",
  },
});

export default function PlaceCard(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [place, setPlace] = useState(props.place);

  useEffect(() => {
    async function getCategoryAndImage() {
      try {
        const categoryResponse = await categoryApi.fetchById(
          token,
          place.categoryId
        );
        const imageResponse = await placeApi.fetchImageById(token, place._id);
        const imageUrl = URL.createObjectURL(imageResponse.data);

        setPlace({
          ...place,
          category: categoryResponse.data,
          image: imageUrl,
        });
      } catch (error) {
        window.alert(error);
      }
    }

    if (!place.category || !place.image) {
      getCategoryAndImage();
    }
  }, [place, token]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="150"
          image={place.image}
          // image="https://static.riviu.co/320/image/2021/01/25/9d61b012b56bbf4260697fcbcdfe2e0b.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Grid container>
            <Grid item container justifyContent="center" alignItems="center">
              <Typography component="div">
                <Box fontWeight={900} fontStyle="underline" fontSize={25}>
                  {place.name}
                </Box>
              </Typography>
              <PlaceInfo
                innerIcon={LoyaltyIcon}
                innerContent={place.category?.name || "None"}
                infoColor="#0B7FAB"
              />
              <PlaceInfo
                innerIcon={AccessTimeIcon}
                innerContent={`${formatTime(
                  place.openingHours.start
                )} - ${formatTime(place.openingHours.end)}`}
              />
              <PlaceInfo
                innerIcon={GradeIcon}
                innerContent={`${place.rating}/10`}
                infoColor="orange"
              />
              <PlaceInfo
                innerIcon={LocationOnIcon}
                innerContent={place.address}
                infoColor="red"
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        {place.isYourFavorite ? (
          <Button
            className={classes.button}
            color="secondary"
            startIcon={<FavoriteIcon />}
          >
            Love it!
          </Button>
        ) : (
          <Button
            className={classes.button}
            color="textSecondary"
            startIcon={<FavoriteBorderIcon />}
          >
            Love it!
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
