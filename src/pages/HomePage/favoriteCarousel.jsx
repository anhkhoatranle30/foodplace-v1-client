import Carousel, {
	arrowsPlugin,
	Dots,
	slidesToShowPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Button, IconButton, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
	KeyboardArrowRight,
	NavigateBefore,
	NavigateNext,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceCard from '../../components/PlaceCard';

const FavoriteCarousel = ({ topFavorites }) => {
	const [value, setValue] = useState(0);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	const length = topFavorites.length + 1;
	const calcNumbersOfEachSlide = () => {
		if (isMobile) return 1;
		if (isMediumScreen) return 2;
		return 3;
	};

	const onChange = (value) => {
		setValue(value);
	};

	const onDotsChange = (value) => {
		setValue(value * calcNumbersOfEachSlide());
	};

	const renderTopFavoritesList = () => {
		const result = topFavorites.map((favorite) => (
			<PlaceCard place={favorite} key={favorite._id} />
		));

		result.push(
			<Button
				key="more_favorite_btn"
				variant="outlined"
				color="primary"
				component={Link}
				to="/places"
			>
        MORE &nbsp; <KeyboardArrowRight />
			</Button>
		);

		return result;
	};

	return (
		<>
			<Carousel
				value={value}
				onChange={onChange}
				plugins={[
					{
						resolve: arrowsPlugin,
						options: {
							arrowLeft: (
								<IconButton color="primary">
									<NavigateBefore />
								</IconButton>
							),
							arrowLeftDisabled: (
								<IconButton color="primary" disabled>
									<NavigateBefore />
								</IconButton>
							),
							arrowRight: (
								<IconButton color="primary">
									<NavigateNext />
								</IconButton>
							),
							arrowRightDisabled: (
								<IconButton color="primary" disabled>
									<NavigateNext />
								</IconButton>
							),
							addArrowClickHandler: true,
						},
					},
					{
						resolve: slidesToShowPlugin,
						options: {
							numberOfSlides: calcNumbersOfEachSlide(),
						},
					},
				]}
			>
				{renderTopFavoritesList()}
			</Carousel>
			<Dots
				value={parseInt(value / calcNumbersOfEachSlide())}
				onChange={onDotsChange}
				number={length / calcNumbersOfEachSlide()}
			/>
		</>
	);
};

export default FavoriteCarousel;
