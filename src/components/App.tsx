import React, { Component, ReactNode } from 'react';
import Footer from './Footer';
import GridComponent from './GridComponent';

export default class App extends Component {
	render(): ReactNode {
		return (
			<div>
				<GridComponent />
				<Footer />
			</div>
		);
	}
}