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
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccessTime as AccessTimeIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Grade as GradeIcon,
  LocationOn as LocationOnIcon,
  Loyalty as LoyaltyIcon,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import placeApi from '../../apis/placeApi';
import formatTime from '../../utils/formatTime';
import categoryApi from './../../apis/categoryApi';
import PlaceInfo from './placeInfo';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: '20px 0px',
  },
  button: {
    fontWeight: 'bold',
  },
});

export default function PlaceCard(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [place, setPlace] = useState(props.place);
  const { isSkeleton } = props;
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getCategoryAndImage() {
      try {
        const categoryResponse = await categoryApi.fetchById(
          token,
          place.categoryId
        );

        let imageUrl;
        if (!place.imageUrl) {
          const imageResponse = await placeApi.fetchImageById(token, place._id);
          imageUrl = URL.createObjectURL(imageResponse.data);
        }

        setPlace({
          ...place,
          category: categoryResponse.data,
          image: place.imageUrl || imageUrl,
        });

        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    }

    if (!isSkeleton && (!place.category || !place.image)) {
      getCategoryAndImage();
    }
  }, [place, token, isSkeleton]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {isFetching || isSkeleton ? (
          <Skeleton height={150} />
        ) : (
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="150"
            image={place.image}
            // image="https://static.riviu.co/320/image/2021/01/25/9d61b012b56bbf4260697fcbcdfe2e0b.jpeg"
            title="Contemplative Reptile"
          />
        )}

        <CardContent>
          <Grid container>
            <Grid item container justifyContent="center" alignItems="center">
              <Typography component="div">
                <Box fontWeight={900} fontStyle="underline" fontSize={25}>
                  {isSkeleton ? <Skeleton /> : place.name}
                </Box>
              </Typography>
              <PlaceInfo
                innerIcon={LoyaltyIcon}
                innerContent={
                  isFetching || isSkeleton ? <Skeleton /> : place.category?.name
                }
                infoColor="#0B7FAB"
              />

              <PlaceInfo
                innerIcon={AccessTimeIcon}
                innerContent={
                  isSkeleton ? (
                    <Skeleton />
                  ) : (
                    `${formatTime(place.openingHours.start)} - ${formatTime(
                      place.openingHours.end
                    )}`
                  )
                }
              />
              <PlaceInfo
                innerIcon={GradeIcon}
                innerContent={isSkeleton ? <Skeleton /> : `${place.rating}/10`}
                infoColor="orange"
              />
              <PlaceInfo
                innerIcon={LocationOnIcon}
                innerContent={isSkeleton ? <Skeleton /> : place.address}
                infoColor="red"
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            {isSkeleton ? (
              <Skeleton width={30} />
            ) : place.isYourFavorite ? (
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
                startIcon={<FavoriteBorderIcon />}
              >
                Love it!
              </Button>
            )}
          </Grid>
          <Grid>
            <IconButton aria-label="Delete" className={classes.margin}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
