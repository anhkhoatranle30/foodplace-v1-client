import { Container, Divider } from '@material-ui/core';
import React from 'react';
import FavoriteSection from './favoriteSection';
import TopSection from './topSection';

export default function HomePage() {
	return (
		<Container maxWidth={false}>
			<Container>
				<TopSection />
			</Container>
			<Divider style={{ margin: '10px 0px' }} />
			<Container>
				<FavoriteSection />
			</Container>
		</Container>
	);
}
