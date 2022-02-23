import { Game } from 'game/game';
import React from 'react';
import GridComponent from './GridComponent';

export default class App extends React.Component {
	render(): React.ReactNode {
		const game = new Game();

		return (
			<GridComponent game={game} />
		);
	}
}