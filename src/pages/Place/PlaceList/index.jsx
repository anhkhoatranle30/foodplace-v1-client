import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';
import placeApi from './../../../apis/placeApi';
import PlaceCard from './../../../components/PlaceCard';

const useStyles = makeStyles({
  formControl: {
    minWidth: '120px',
  },
});

export default function PlacesList() {
  const classes = useStyles();

  //#region useForm
  const { register, handleSubmit } = useForm();
  //#endregion

  //#region redux hooks
  const categories = useSelector((state) => state.category.data);
  const token = useSelector((state) => state.user.token);
  //#endregion

  //#region useState (searchString, currentPage, places, quantity, isLoading)
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [places, setPlaces] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region useEffect(quantity, places)
  useEffect(() => {
    async function fetchQuantity() {
      try {
        const response = await placeApi.fetchQuantity(token, {
          search: searchString,
        });
        setQuantity(response.data.quantity);
      } catch (error) {
        window.alert(error.response.data);
      }
    }

    fetchQuantity();
  }, [token, searchString]);
  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const placesResponse = await placeApi.fetchAll(token, {
          skip: itemsEachPage * (currentPage - 1),
          limit: itemsEachPage,
          search: searchString,
        });
        setPlaces(placesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, [token, currentPage, searchString, quantity]);
  //#endregion

  const itemsEachPage = 12;
  const countPage = () => {
    const floor = Math.floor(quantity / itemsEachPage);
    if (floor === Math.ceil(quantity / itemsEachPage)) {
      return floor;
    }
    return floor + 1;
  };

  //#region render functions (places, skeleton, categories)
  const renderPlaces = () => {
    if (places.length === 0) {
      return (
        <EmptyPlaceholder
          title="No place found!"
          body="It seems like you have not added any place yet. Click the `Add a place` button to see more."
        />
      );
    }
    return places.map((place) => (
      <Grid key={place._id} item xs={12} sm={6} md={4} lg={3}>
        <PlaceCard place={place} triggerDelete={handlePlaceDelete} />
      </Grid>
    ));
  };

  const renderSkeletonPlaces = () => {
    const result = [];
    for (let i = 0; i < 1; i++) {
      result.push(
        <Grid
          key={`place-card-skeleton-${i}`}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <PlaceCard isSkeleton />
        </Grid>
      );
    }
    return result;
  };

  const renderCategories = (categoriesArray) => {
    const result = [];
    result.push(
      <MenuItem key="all_categories" value="">
        All
      </MenuItem>
    );
    const options = categoriesArray.map((category) => (
      <MenuItem key={category._id} value={category._id}>
        {category.name}
      </MenuItem>
    ));
    result.push(...options);
    return result;
  };
  //#endregion

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleSearchSubmit = (formValues) => {
    setSearchString(formValues.search);
  };

  const handlePlaceDelete = (deletedPlace) => {
    setPlaces((places) =>
      places.filter((place) => place._id !== deletedPlace._id)
    );
    setQuantity((quantity) => quantity - 1);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* 2 buttons */}
        <Grid container alignItems="center" justifyContent="space-between">
          <form>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="places-list-category-label">Category</InputLabel>
              <Select
                defaultValue=""
                label="Category"
                autoWidth
                labelId="places-list-category-label"
              >
                {renderCategories(categories)}
              </Select>
            </FormControl>
          </form>
          <Button
            component={Link}
            to="/places/new"
            variant="outlined"
            color="primary"
            startIcon={<Add />}
          >
            <Box fontWeight={700}>Add a place</Box>
          </Button>
        </Grid>

        {/* search bar  */}
        <Grid container alignItems="center" style={{ marginTop: 20 }}>
          <form autoComplete="off" onSubmit={handleSubmit(handleSearchSubmit)}>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="search-place-label">Search place</InputLabel>
              <OutlinedInput {...register('search')} label="Search place" />
            </FormControl>
          </form>
        </Grid>
        {/* cards list */}
        <Grid container alignItems="center">
          {isLoading ? renderSkeletonPlaces() : renderPlaces()}
        </Grid>
        {/* pagination */}
        <Grid>
          <Pagination
            color="primary"
            hideNextButton
            hidePrevButton
            page={currentPage}
            count={countPage()}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
