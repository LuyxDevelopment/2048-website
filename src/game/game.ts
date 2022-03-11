import { RandomEngine } from 'better-random.js';

const rng = new RandomEngine();

export class Game {
	private _grid: number[];
	private _score: number;

	public moves: number;
	public over: boolean;

	constructor();
	constructor(grid?: number[]);

	constructor(grid?: number[]) {
		this._score = 0;

		this.moves = 0;
		this.over = false;


		if (grid === undefined) {
			this._grid = this.generateGrid();
		} else {
			this._grid = grid;
		}
	}

	get grid(): number[] {
		return this._grid;
	}

	get score(): number {
		return this._score;
	}

	private generateGrid(): number[] {
		const grid = new Array<number>(16).fill(0);

		for (let i = 0; i < 2; i++) {
			const index = rng.uniform_int(0, 15);

			if (grid[index]) {
				i--;
				continue;
			}

			grid[index] = rng.chance(0.9) ? 2 : 4;
		}

		return grid;
	}

	public restart(): void {
		this.moves = 0;
		this._score = 0;
		this._grid = this.generateGrid();
	}

	public at(x: number, y: number): number {
		return this._grid[y * 4 + x]!;
	}

	public atIndex(index: number): number {
		return this._grid[index]!;
	}

	public has(number: number): boolean {
		return this._grid.includes(number);
	}

	public insertRandom(): void {
		const indexes: number[] = [];
		for (let i = 0; i < this._grid.length; i++) {
			if (!this._grid[i]) indexes.push(i);
		}

		this._grid[rng.element(indexes)] = rng.chance(0.9) ? 2 : 4;
	}

	public isOver(): boolean {
		const moves = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		] as const;

		for (let d = 0; d < 4; d++) {
			for (let i = 0; i < 16; i++) {
				const ray = this.castRay(i % 4, Math.floor(i / 4) % 4, moves[d]![0]!, moves[d]![1]!);

				if ((ray.value === this._grid[i]) || !this._grid[i]) return false;
			}
		}

		return true;
	}

	public set(x: number, y: number, value: number): number {
		return this._grid[y * 4 + x] = value;
	}

	public merge(x1: number, y1: number, x2: number, y2: number): void {
		this.set(x1, y1, 0);
		const value = this.at(x2, y2) * 2;
		this.set(x2, y2, value);

		this._score += value;
	}

	public move(x: number, y: number, toX: number, toY: number): boolean {
		if (x === toX && y === toY) return false;

		this.set(toX, toY, this.at(x, y));
		this.set(x, y, 0);

		return true;
	}

	public castRay(x: number, y: number, dx: 1 | 0 | -1, dy: 1 | 0 | -1): { value: number, x: number, y: number } {
		x += dx;
		y += dy;

		for (; x >= 0 && x < 4 && y >= 0 && y < 4; x += dx, y += dy) {
			const value = this.at(x, y);

			if (value) {
				return { value, x, y };
			}
		}

		return { value: 0, x: x - dx, y: y - dy };
	}
}