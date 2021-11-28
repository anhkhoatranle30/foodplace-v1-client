import { yupResolver } from '@hookform/resolvers/yup';
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Select,
	Snackbar,
	Switch,
	Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { placeSchema } from '../../../schemas/yup';
import placeApi from './../../../apis/placeApi';
import TimePicker from './TimePicker';
import imageApis from '../../../apis/images'

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '20px',
	},
	formControl: {
		margin: '10px 0px',
		marginRight: '5px',
		minWidth: '120px',
	},
	outlinedInput: {
		minWidth: '200px',
	},
	fullWidthInput: {
		width: '100%',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const formDefaultValue = {
	categoryId: '',
	rating: 8,
	openingHours: {
		start: {
			hour: 0,
			minute: 0,
		},
		end: {
			hour: 23,
			minute: 59,
		},
	},
	isYourFavorite: false,
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PlaceCreate() {
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: { ...formDefaultValue },
		resolver: yupResolver(placeSchema),
	});

	const [isSuccessOpen, setSuccessOpen] = useState(false);
	const [isLoadingOpen, setLoadingOpen] = useState(false);
	const [isErrorOpen, setErrorOpen] = useState(false);

	const categories = useSelector((state) => state.category.data);
	const token = useSelector((state) => state.user.token);

	const renderRatingList = () => {
		const result = [];
		for (let i = 0; i <= 10; i++) {
			result.push(
				<MenuItem key={`rating${i}`} value={i}>
					{i}
				</MenuItem>
			);
		}
		return result;
	};

	const renderCategoriesList = () => {
		return categories.map((category) => (
			<MenuItem key={category._id} value={category._id}>
				{category.name}
			</MenuItem>
		));
	};

	const handleFormSubmit = async (data) => {
		setLoadingOpen(true);
		const imageFile = data.image[0];
		delete data.image;
		try {
			if (imageFile) {
				// await placeApi.uploadImage(token, newPlace._id, imageFile);
				const imageResponse = await imageApis.postOne(imageFile);
				const imageUrl = imageResponse.data.url;
				data.imageUrl = imageUrl;
			}
			const response = await placeApi.createNewPlace(token, data);
			const newPlace = response.data;
      console.log("🚀 ~ file: index.jsx ~ line 122 ~ handleFormSubmit ~ newPlace", newPlace)
			setSuccessOpen(true);
			setLoadingOpen(false);
		} catch (error) {
			setErrorOpen(true);
			setLoadingOpen(false);
		}
	};

	const handleSuccessClose = (e, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSuccessOpen(false);
	};
	const handleErrorClose = (e, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
	};

	return (
		<Container className={classes.root}>
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
          Successfully added new place!
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
			<form id="new-place-form" onSubmit={handleSubmit(handleFormSubmit)}>
				<Grid container direction="column" alignItems="center">
					<Typography component="div">
						<Box fontWeight={900} fontSize="h3.fontSize">
              ADD NEW PLACE
						</Box>
					</Typography>
					{/* name category rating */}
					<Grid container alignItems="center">
						<FormControl
							error={errors.name ? true : false}
							className={classes.formControl}
							variant="outlined"
						>
							<InputLabel htmlFor="new-place-name">Name</InputLabel>
							<OutlinedInput
								id="new-place-name"
								className={classes.outlinedInput}
								label="Name"
								{...register('name')}
							/>
							<FormHelperText>{errors.name?.message}</FormHelperText>
						</FormControl>
						<FormControl
							error={errors.categoryId ? true : false}
							className={classes.formControl}
							variant="outlined"
						>
							<InputLabel id="places-list-category-label">Category</InputLabel>
							<Select
								defaultValue={formDefaultValue.categoryId}
								label="Category"
								{...register('categoryId')}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{renderCategoriesList()}
							</Select>
							<FormHelperText>{errors.categoryId?.message}</FormHelperText>
						</FormControl>
						<FormControl
							error={errors.rating ? true : false}
							className={classes.formControl}
							variant="outlined"
						>
							<InputLabel id="new-place-rating-label">Rating</InputLabel>
							<Select
								defaultValue={formDefaultValue.rating}
								label="Rating"
								autoWidth
								labelId="new-place-rating-label"
								{...register('rating')}
							>
								{renderRatingList()}
							</Select>
							<FormHelperText>{errors.rating?.message}</FormHelperText>
						</FormControl>
					</Grid>
					{/* address */}
					<Grid container item xs={12}>
						<FormControl
							fullWidth
							className={classes.formControl}
							variant="outlined"
							error={errors.address ? true : false}
						>
							<InputLabel id="new-place-address-label">Address</InputLabel>
							<OutlinedInput
								defaultValue={formDefaultValue.address}
								label="Address"
								{...register('address')}
							/>
							<FormHelperText>{errors.address?.message}</FormHelperText>
						</FormControl>
					</Grid>
					{/* opening hours */}
					<Grid
						style={{ marginBottom: '15px' }}
						container
						direction="column"
						justifyContent="center"
					>
						<Grid item xs={12}>
							<Typography component="div">
								<Box fontWeight={700}>Opening Hours</Box>
							</Typography>
						</Grid>
						<Grid container>
							<TimePicker
								label="start"
								defaultHour={formDefaultValue.openingHours.start.hour}
								defaultMinute={formDefaultValue.openingHours.start.minute}
								register={register}
							/>
							<TimePicker
								label="end"
								defaultHour={formDefaultValue.openingHours.end.hour}
								defaultMinute={formDefaultValue.openingHours.end.minute}
								register={register}
							/>
						</Grid>
					</Grid>
					{/* favorite switch */}
					<Grid container alignItems="center">
						<Controller
							name="isYourFavorite"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Switch
									onChange={onChange}
									checked={value || false}
									color="primary"
									name="favorite-switch"
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>
							)}
						/>
						<Typography>Add to favorite list</Typography>
					</Grid>
					{/* description */}
					<Grid container item xs={12}>
						<FormControl
							fullWidth
							className={classes.formControl}
							variant="outlined"
							error={errors.description ? true : false}
						>
							<InputLabel id="new-place-description-label">
                Description
							</InputLabel>
							<OutlinedInput
								defaultValue={formDefaultValue.description}
								label="description"
								multiline
								rows={4}
								{...register('description')}
							/>
							<FormHelperText>{errors.description?.message}</FormHelperText>
						</FormControl>
					</Grid>
					{/* image upload */}
					<Grid container alignItems="center">
						<Grid item xs={12} sm={6}>
							<input
								accept="image/*"
								className={classes.imageInput}
								id="contained-button-file"
								multiple
								type="file"
								{...register('image')}
							/>
							{/* <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label> */}
						</Grid>
					</Grid>
					{/* submit button */}
					<Grid container alignItems="center" justifyContent="center">
						<FormControl className={classes.formControl} fullWidth>
							<Button
								type="submit"
								form="new-place-form"
								variant="contained"
								color="primary"
								size="large"
							>
                Submit
							</Button>
						</FormControl>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}
