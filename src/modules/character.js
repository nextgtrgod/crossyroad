import * as PIXI from 'pixi.js'
import { Tween } from 'es6-tween'
import Events from '@/events'
import Key from '@/modules/Key'
import Touch from '@/modules/Touch'
import Animator from '@/modules/Animator'

import map from '@/data/map'
import grid from '@/data/grid'
import obstacles from '@/data/obstacles'
import death from '@/data/death'

import { cartToIso } from '@/utils/convert'

let loaded = {}
let assets = {}

export default class Character {
	constructor() {

		this.container = new PIXI.Container()
		this.container.name = 'character'

		this.controls = {};

		this.controls = {
			up: 	new Key('up', () => this.move({ x: 0, y: -1 }) ),
			down: 	new Key('down', () => this.move({ x: 0, y: 1 }) ),
			left:	new Key('left', () => this.move({ x: -1, y: 0 }) ),
			right: 	new Key('right', () => this.move({ x: 1, y: 0 }) ),
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
			x: 0,
			y: 0,
		}

		this.moveTime = 100
	}

	async preload() {
		return new Promise((resolve, reject) => {

			assets = {
				// 'down_right': require(`@/assets/2x/character/moving/down_right.json`),
				// 'left_down': require(`@/assets/2x/character/moving/left_down.json`),
				// 'right_up': require(`@/assets/2x/character/moving/right_up.json`),
				// 'up_left': require(`@/assets/2x/character/moving/up_left.json`),

				// 'idle_up': require(`@/assets/2x/character/idle/idle_up.json`),
				// 'idle_down': require(`@/assets/2x/character/idle/idle_down.json`),
				// 'idle_left': require(`@/assets/2x/character/idle/idle_left.json`),
				// 'idle_right': require(`@/assets/2x/character/idle/idle_right.json`),
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

		if (this.state === 'moving') return

		this.state = 'moving'

		// rotate character

		let prevDirection = this.direction

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
		if (map[pos.y] === undefined || map[pos.y][pos.x] === undefined) return this.setState('idle')


		// collision (wall)
		if (obstacles.indexOf(map[pos.y][pos.x]) > -1) return this.setState('idle')


		// death
		if (death.indexOf(map[pos.y][pos.x]) > -1) this.setState('died')


		this.position = pos
		Events.$emit('character-pos', this.position)
		console.log(this.position)
		

		let newPos = cartToIso(
			grid.size.y / 2 * nextPos.y,
			grid.size.x / 2 * nextPos.x,
		)

		this.container.position.set(
			this.container.x + newPos.x,
			this.container.y + newPos.y,
		)

		new Tween({
				x: this.container.x,
				y: this.container.y,
			})
			.to({
				x: this.container.x + newPos.x,
				y: this.container.y + newPos.y,
			}, this.moveTime)
			.on('update', ({ x, y }) => {
				this.container.x = x
				this.container.y = y
			})
			.on('complete', () => {
				if (this.state === 'died') {
					Events.$emit('character-death', { type: 'pit' })

					return
				}

				this.state = 'idle'
			})
			.start()
	}

	setState = state => this.state = state

	swapTexture(direction) {
		let sprite = new PIXI.Sprite(PIXI.loader.resources[assets[this.direction]].texture)

		sprite.anchor.set(0, 1)

		this.container.children = []

		this.sprite = sprite

		this.container.addChild(this.sprite)
	}

	draw(assets) {

		console.log(PIXI.loader.resources)

		this.animation = {
			'down_right': new Animator({ name: 'down_right_00', json: assets['down_right'] }),
			// 'left_down': new Animator({ name: 'left_down_00', loopStart: 81 }),
			// 'right_up': new Animator({ name: 'right_up_00', loopStart: 27 }),
			// 'up_left': new Animator({ name: 'up_left_00', loopStart: 54 }),

			// //temp
			// 'up_down': new Animator({ name: 'up_left_00', loopStart: 54 }),


			// // reverse
			// 'right_down': new Animator({ name: 'down_right_00', speed: -1 }),
			// 'down_left': new Animator({ name: 'left_down_00', loopStart: 81, speed: -1 }),
			// 'up_right': new Animator({ name: 'right_up_00', loopStart: 27, speed: -1 }),
			// 'left_up': new Animator({ name: 'up_left_00', loopStart: 54, speed: -1 }),

			// //temp
			// 'down_up': new Animator({ name: 'up_left_00', loopStart: 54, speed: -1 }),

			// // idle
			// // ...
			// // temp
			// 'idle_up': new Animator({ name: 'right_up_00', loopStart: 27 }),
			// 'idle_down': new Animator({ name: 'left_down_00', loopStart: 81 }),
			// 'idle_left': new Animator({ name: 'up_left_00', loopStart: 54 }),		
			// 'idle_right': new Animator({ name: 'down_right_00' }),
		}

		this.animation['down_right'].play()
		this.container.addChild(this.animation['down_right'])

		// Object.keys(assets).map(key => {
		// 	loaded[key] = new PIXI.Sprite(PIXI.loader.resources[assets[key]].texture)
		// })

		// let sprite = new PIXI.Sprite(PIXI.loader.resources[assets.up].texture)

		// sprite.anchor.set(0, 1)


		// this.sprite = sprite

		// this.container.addChild(this.sprite)

		let pos = cartToIso(
			this.position.x * grid.size.x,
			this.position.y * grid.size.y,
		)

		this.container.x = pos.x
		this.container.y = pos.y
	}
}
