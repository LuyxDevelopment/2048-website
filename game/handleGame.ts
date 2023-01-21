import GridComponent from 'components/GridComponent.js';
import { UP_INDEXES, DOWN_INDEXES, LEFT_INDEXES, RIGHT_INDEXES } from './constants';

export function handleGame(key: KeyboardEvent, component: GridComponent): void {
	const { game } = component;

	switch (key.code) {
		case 'ArrowUp': {
			if (game.over) return;

			let moved = false;

			for (const index of UP_INDEXES) {
				if (!game.atIndex(index)) continue;

				const x = index % 4;
				const y = Math.floor(index / 4) % 4;

				const ray = game.castRay(x, y, 0, -1);

				if (game.atIndex(index) === ray.value) {
					game.merge(x, y, ray.x, ray.y);
					moved = true;
				} else if (ray.value) {
					if (game.move(x, y, ray.x, ray.y + 1)) moved = true;
				} else {
					game.move(x, y, ray.x, ray.y);
					moved = true;
				}
			}

			if (moved) {
				game.moves++;
				game.insertRandom();
			}

		} break;

		case 'ArrowDown': {
			if (game.over) return;

			let moved = false;

			for (const index of DOWN_INDEXES.slice().reverse()) {
				if (!game.atIndex(index)) continue;

				const x = index % 4;
				const y = Math.floor(index / 4) % 4;

				const ray = game.castRay(x, y, 0, 1);

				if (game.atIndex(index) === ray.value) {
					game.merge(x, y, ray.x, ray.y);
					moved = true;
				} else if (ray.value) {
					if (game.move(x, y, ray.x, ray.y - 1)) moved = true;
				} else {
					game.move(x, y, ray.x, ray.y);
					moved = true;
				}
			}

			if (moved) {
				game.moves++;
				game.insertRandom();
			}

		} break;

		case 'ArrowLeft': {
			if (game.over) return;

			let moved = false;

			for (const index of LEFT_INDEXES) {
				if (!game.atIndex(index)) continue;

				const x = index % 4;
				const y = Math.floor(index / 4) % 4;

				const ray = game.castRay(x, y, -1, 0);

				if (game.atIndex(index) === ray.value) {
					game.merge(x, y, ray.x, ray.y);
					moved = true;
				} else if (ray.value) {
					if (game.move(x, y, ray.x + 1, ray.y)) moved = true;
				} else {
					game.move(x, y, ray.x, ray.y);
					moved = true;
				}
			}

			if (moved) {
				game.moves++;
				game.insertRandom();
			}

		} break;

		case 'ArrowRight': {
			if (game.over) return;

			let moved = false;

			for (const index of RIGHT_INDEXES.slice().reverse()) {
				if (!game.atIndex(index)) continue;

				const x = index % 4;
				const y = Math.floor(index / 4) % 4;

				const ray = game.castRay(x, y, 1, 0);

				if (game.atIndex(index) === ray.value) {
					game.merge(x, y, ray.x, ray.y);
					moved = true;
				} else if (ray.value) {
					if (game.move(x, y, ray.x - 1, ray.y)) moved = true;
				} else {
					game.move(x, y, ray.x, ray.y);
					moved = true;
				}
			}

			if (moved) {
				game.moves++;
				game.insertRandom();
			}

		} break;
	}

	component.updateGrid();
	component.setState({ moves: game.moves, score: game.score });

	if (!game.has(0)) {
		if (game.isOver()) {
			game.over = true;

			component.endGame();

			return;
		}
	}
}