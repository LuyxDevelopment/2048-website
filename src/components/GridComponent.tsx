import { Game } from '../game/game';
import React from 'react';
import Square from './Square';
import { handleGame } from 'game/handleGame';

export default class GridComponent<P extends { game: Game }> extends React.Component<P, { gameOver: string, moves: number, score: number, squares: number[] }> {
	constructor(props: P) {
		super(props);
		this.state = {
			gameOver: '',
			moves: 0,
			score: 0,
			squares: this.props.game.grid
		};
	}

	public componentDidMount(): void {
		document.addEventListener('keydown', (key) => {
			handleGame(key, this);
		});
	}

	public renderSquare(i: number): JSX.Element {
		return (<Square value={this.state.squares[i]!} />);
	}

	public endGame(): void {
		this.setState({ gameOver: 'Game Over!' });
	}

	public updateGrid(): void {
		const squares = this.props.game.grid.slice();

		for (let i = 0; i < 15; i++) {
			squares[i] = this.props.game.grid[i]!;
		}

		this.setState({ squares });
	}

	public render(): React.ReactNode {
		return (
			<div>
				<div className='header'>
					<h1>Welcome to 2048</h1>
					<h2>{this.state.gameOver}</h2>
					<p>Score: {this.state.score} - Moves: {this.state.moves}</p>
				</div>

				<div className='grid'>
					<div className='grid-row'>
						{this.renderSquare(0)}
						{this.renderSquare(1)}
						{this.renderSquare(2)}
						{this.renderSquare(3)}
					</div>
					<div className='grid-row'>
						{this.renderSquare(4)}
						{this.renderSquare(5)}
						{this.renderSquare(6)}
						{this.renderSquare(7)}
					</div>
					<div className='grid-row'>
						{this.renderSquare(8)}
						{this.renderSquare(9)}
						{this.renderSquare(10)}
						{this.renderSquare(11)}
					</div>
					<div className='grid-row'>
						{this.renderSquare(12)}
						{this.renderSquare(13)}
						{this.renderSquare(14)}
						{this.renderSquare(15)}
					</div>
				</div>
			</div>
		);
	}
}
