import * as PIXI from 'pixi.js'
import { Tween } from 'es6-tween'
import Key from '@/modules/Key'
import Touch from '@/modules/Touch'

import map from '@/data/map'
import grid from '@/data/grid'
import obstacles from '@/data/obstacles'

let loaded = {}
let assets = {}

export default class Character {
	constructor() {

		this.container = new PIXI.Container()

		this.controls = {};

		this.controls = {
			up: 	new Key('up', () => this.move({ x: 0, y: -1 }), this.stop),
			down: 	new Key('down', () => this.move({ x: 0, y: 1 }), this.stop),
			left:	new Key('left', () => this.move({ x: -1, y: 0 }), this.stop),
			right: 	new Key('right', () => this.move({ x: 1, y: 0 }), this.stop),
			touch: 	new Touch({
				up:	() => this.move({ x: 0, y: -1 }),
				down: () => this.move({ x: 0, y: 1 }),
				left: () => this.move({ x: -1, y: 0 }),
				right: () => this.move({ x: 1, y: 0 }),
			})
		}

		this.direction = 'up'
		this.state = 'idle' // 'idle', 'moving', 'death' (+ death options)

		// initial position
		// first row center
		this.position = {
			x: map[0].length / 2, 
			y: map.length - 1,
		}

		this.moveTime = 100
	}

	async preload() {
		return new Promise((resolve, reject) => {

			assets = {
				up: require(`@/assets/character/moving/up/0.png`),
				down: require(`@/assets/character/moving/down/0.png`),
				left: require(`@/assets/character/moving/left/0.png`),
				right: require(`@/assets/character/moving/right/0.png`),
			}
	
			PIXI.loader
				.add(Object.values(assets))
				.load(() => {
					resolve()
					this.draw(assets)
				})
		})
	}

	move(nextPos) {

		// rotate character

		this.direction = nextPos.x
			? (nextPos.x > 0)
				? 'right'
				: 'left'
			: (nextPos.y > 0)
				? 'down'
				: 'up'
		
		this.swapTexture()


		let pos = {
			x: this.position.x + nextPos.x,
			y: this.position.y + nextPos.y,			
		}

		// out of map
		if (map[pos.y] === undefined || map[pos.y][pos.x] === undefined) return

		// collision (wall)
		if (obstacles.indexOf(map[pos.y][pos.x]) > -1) return

		this.position = pos

		new Tween({
				x: this.container.x,
				y: this.container.y
			})
			.to({
				x: this.container.x + grid.size * nextPos.x,
				y: this.container.y + grid.size * nextPos.y,
			}, this.moveTime)
			.on('update', ({ x, y }) => {
				this.container.x = x
				this.container.y = y
			})
			.start()

	}

	swapTexture(direction) {
		let sprite = new PIXI.Sprite(PIXI.loader.resources[assets[this.direction]].texture)

		sprite.pivot.set(
			sprite.width / 2,
			sprite.heigth / 2,
		)

		sprite.position.set(
			grid.size / 2,
			grid.size / 2
		)

		this.container.children = []

		this.sprite = sprite

		this.container.addChild(this.sprite)
	}

	stop() {
		this.state = 'stop'
	}

	draw(assets) {

		Object.keys(assets).map(key => {
			loaded[key] = new PIXI.Sprite(PIXI.loader.resources[assets[key]].texture)
		})

		let sprite = new PIXI.Sprite(PIXI.loader.resources[assets.up].texture)

		sprite.pivot.set(
			sprite.width / 2,
			sprite.heigth / 2,
		)

		sprite.position.set(
			grid.size / 2,
			grid.size / 2
		)

		this.sprite = sprite

		this.container.addChild(this.sprite)

		this.container.pivot.set(
			this.container.width / 2,
			this.container.heigth / 2,
		)

		this.container.scale.set(4, 4)

		this.container.position.x = this.position.x * grid.size
		this.container.position.y = this.position.y * grid.size
	}
}