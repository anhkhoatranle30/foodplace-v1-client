import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../../schemas/yup";

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
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
