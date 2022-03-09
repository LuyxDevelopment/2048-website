import { Game } from '../game/game';
import React from 'react';
import { handleGame } from 'game/handleGame';

export default class GridComponent extends React.Component<Record<string, unknown>, { gameOver: string, moves: number, score: number, squares: number[] }> {
	public gridCanvas: React.RefObject<HTMLCanvasElement>;
	public readonly game: Game;

	constructor(props: Record<string, unknown>) {
		super(props);

		this.game = new Game();
		this.state = {
			gameOver: '',
			moves: this.game.moves,
			score: this.game.score,
			squares: this.game.grid
		};

		this.gridCanvas = React.createRef();

		this.restart = this.restart.bind(this);
	}

	private getImageCoords(index: number): [number, number] {
		const x = index % 4;
		const y = Math.floor(index / 4) % 4;

		return [x * (100 + 15) + 15, y * (100 + 15) + 15];
	}

	private roundedImage(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	}

	private draw(): void {
		const ctx = this.gridCanvas.current!.getContext('2d')!;

		for (let i = 0; i < 16; i++) {
			const image = new Image(100, 100);

			image.onload = (): void => {
				ctx.save();
				this.roundedImage(ctx, ...this.getImageCoords(i), 100, 100, 10);
				ctx.clip();
				ctx.drawImage(image, ...this.getImageCoords(i), 100, 100);
				ctx.restore();
			};

			image.src = `images/${this.state.squares[i]}.png`;
		}
	}

	public componentDidMount(): void {
		const ctx = this.gridCanvas.current!.getContext('2d')!;

		ctx.fillStyle = '#757575';
		ctx.fillRect(0, 0, 480, 480);

		this.draw();

		document.addEventListener('keydown', (key) => {

			handleGame(key, this);

			this.draw();
		});
	}

	public endGame(): void {
		this.setState({ gameOver: 'Game Over!' });
	}

	public updateGrid(): void {
		const squares = this.game.grid.slice();

		for (let i = 0; i < 15; i++) {
			squares[i] = this.game.grid[i]!;
		}

		this.setState({ squares });
	}

	private restart(): void {
		this.game.regenerate();

		this.setState({ gameOver: '', moves: 0, score: 0, squares: this.game.grid }, () => {
			this.draw();
		});
	}

	public render(): React.ReactNode {
		return (
			<div>
				<div>
					<h1>
						Welcome to 2048
					</h1>
					<h2>{this.state.gameOver}</h2>
					<p>Score: {this.state.score} - Moves: {this.state.moves}</p>
					<input className='new-game' type='button' value='New Game' onClick={this.restart}></input>
				</div>
				<div className='grid'>
					<canvas ref={this.gridCanvas} width='475' height='475' />
				</div>
			</div>
		);
	}
}
