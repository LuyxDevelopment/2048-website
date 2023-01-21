import { handleGame } from 'game/handleGame';
import ms from 'pretty-ms';
import React, { Component, createRef, ReactNode, RefObject } from 'react';

import { Game } from '../game/game';

export default class GridComponent extends Component<Record<string, unknown>, { gameOver: string, moves: number, score: number, squares: number[], time: number; }> {
	public gridCanvas: RefObject<HTMLCanvasElement>;
	public timer: RefObject<HTMLElement>;
	public timerID?: NodeJS.Timer;
	public readonly game: Game;

	constructor(props: Record<string, unknown>) {
		super(props);

		this.game = new Game();
		this.state = {
			gameOver: '',
			moves: this.game.moves,
			score: this.game.score,
			squares: this.game.grid,
			time: 0
		};

		this.gridCanvas = createRef();
		this.timer = createRef();

		this.restart = this.restart.bind(this);
	}

	private getImageCoords(index: number): [number, number] {
		return [
			(index % 4) * (100 + 15) + 15,
			(Math.floor(index / 4) % 4) * (100 + 15) + 15
		];
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

	public componentWillUnmount(): void {
		clearInterval(this.timerID!);
		this.timerID = undefined;
	}


	public componentDidMount(): void {
		const ctx = this.gridCanvas.current!.getContext('2d')!;

		ctx.fillStyle = '#757575';
		ctx.fillRect(0, 0, 480, 480);

		this.draw();

		document.addEventListener('keydown', (key) => {

			if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key.code)) return;

			if (!this.game.moves && !this.timerID && !this.game.over) {
				this.timerID = setInterval(() => {
					this.setState({ time: (this.state.time + 1) });
				}, 100);
			}

			handleGame(key, this);

			this.draw();
		});
	}

	public endGame(): void {
		clearInterval(this.timerID!);
		this.timerID = undefined;

		this.setState({ gameOver: 'Game Over!' });
		this.game.restart();
	}

	public updateGrid(): void {
		const squares = this.game.grid.slice();

		for (let i = 0; i < 15; i++) {
			squares[i] = this.game.grid[i]!;
		}

		this.setState({ squares });
	}

	private restart(): void {
		this.game.restart();
		this.game.over = false;

		this.setState({ gameOver: '', moves: 0, score: 0, squares: this.game.grid, time: 0 }, () => {
			this.draw();
		});

		clearInterval(this.timerID!);
		this.timerID = undefined;
	}

	public render(): ReactNode {
		return (
			<div>
				<div>
					<h1>
						Welcome to 2048
					</h1>
					<h2>{this.state.gameOver}</h2>
					<p className='details'>Score: {this.state.score} - Moves: {this.state.moves} - Time: {ms(this.state.time * 100)}</p>
					<input className='new-game' type='button' value='New Game' onClick={this.restart}></input>
				</div>
				<div className='grid'>
					<canvas ref={this.gridCanvas} width='475' height='475' />
				</div>
			</div>
		);
	}
}
