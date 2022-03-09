import React from 'react';
import Footer from './Footer';
import GridComponent from './GridComponent';

export default class App extends React.Component {
	render(): React.ReactNode {
		return (
			<div>
				<GridComponent />
				<Footer />
			</div>
		);
	}
}