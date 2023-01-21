import { NextPage } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import GridComponent from '../components/GridComponent';
import { useMetaData } from '../lib/hooks/useMetaData';

const Home: NextPage = () => {
	return (
		<div>
			{useMetaData({ description: 'Luyx custom 2048', name: '2048 | Luyx', url: '/' })}
			<GridComponent />
			<Footer />
		</div>
	);
};

export default Home;