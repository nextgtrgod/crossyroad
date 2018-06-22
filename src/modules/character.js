import * as PIXI from 'pixi.js'
import { Tween } from 'es6-tween'
import Key from '@/modules/key'

import map from '@/data/map'
import grid from '@/data/grid'
import obstacles from '@/data/obstacles'

export default class Character {
	constructor() {

		this.container = new PIXI.Container()

		this.controls = {};

		this.controls = {
			'up': 		new Key('up', () => this.move({ x: 0, y: -1 }), this.stop),
			'down': 	new Key('down', () => this.move({ x: 0, y: 1 }), this.stop),
			'left':		new Key('left', () => this.move({ x: -1, y: 0 }), this.stop),
			'right': 	new Key('right', () => this.move({ x: 1, y: 0 }), this.stop),
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

	move(nextPos) {

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

	stop() {
		this.state = 'stop'
	}

	async preload() {
		return new Promise((resolve, reject) => {
			let assets = {
				up: [
					require(`@/assets/character/moving/up/0.png`)
				]
			}
	
			PIXI.loader
				.add(require(`@/assets/character/moving/up/0.png`))
				.load(() => {
					resolve()
					this.draw(assets)
				})
		})
	}

	draw(assets) {

		let sprite = new PIXI.Sprite(PIXI.loader.resources[assets.up].texture)

		sprite.pivot.set(
			sprite.width / 2,
			sprite.heigth / 2,
		)

		sprite.position.set(
			32,
			32
		)

		// console.log(sprite.width)

		this.container.addChild(sprite)

		this.container.pivot.set(
			this.container.width / 2,
			this.container.heigth / 2,
		)

		this.container.scale.set(
			4, 4
		)

		this.container.position.x = this.position.x * grid.size
		this.container.position.y = this.position.y * grid.size

	}
}