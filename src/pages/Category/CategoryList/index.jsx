import {
  Box,
  Container,
  Typography,
  Grid,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React from "react";
import CategoryCard from "../../../components/CategoryCard";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { STATUS } from "../../../constant";
import { useSelector } from "react-redux";
import EmptyPlaceholder from "../../../components/EmptyPlaceholder";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    position: "relative",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function CategoryList() {
  const classes = useStyles();

  const categories = useSelector((state) => state.category);

  const renderSkeletonCategoryCards = () => {
    const result = [];
    for (let i = 1; i <= 20; i++) {
      result.push(
        <Grid item>
          <CategoryCard isSkeleton={true} />
        </Grid>
      );
    }
    return result;
  };

  const renderCategoryCards = () => {
    if (categories.data.length === 0) {
      return (
        <EmptyPlaceholder
          title="No category found!"
          body="It seems like you have not added any category yet. Click the button on bottom right corner for more information."
        />
      );
    }

    return categories.data.map((category) => (
      <CategoryCard category={category} />
    ));
  };

  return (
    <Container className={classes.root}>
      <Typography component="div">
        <Box color="theme.primary" fontWeight={900} fontSize="h3.fontSize">
          Explore your categories
        </Box>
      </Typography>
      <Grid container>
        {categories.status === STATUS.LOADING
          ? renderSkeletonCategoryCards()
          : renderCategoryCards()}
      </Grid>
      <Tooltip title="Add new category">
        <Fab
          component={Link}
          to="/categories/new"
          className={classes.fab}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
}
