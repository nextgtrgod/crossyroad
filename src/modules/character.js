import * as PIXI from 'pixi.js'
import { Tween, Easing } from 'es6-tween'
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
			x: Math.floor(map[0].length / 2),
			y: map.length - 1,
		}

		this.moveTime = 500

		this.draw()
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
		
		let directionName = prevDirection === this.direction
			? this.direction
			: `${prevDirection}_${this.direction}`

		this.swapTexture(directionName)


		let pos = {
			x: this.position.x + nextPos.x,
			y: this.position.y + nextPos.y,
		}

		// out of map
		if (map[pos.y] === undefined || map[pos.y][pos.x] === undefined) return this.setState('idle')


		let cell = map[pos.y][pos.x].split(':')

		// collision (wall)
		cell.map(tileIndex => {
			if (obstacles.includes(+tileIndex)) this.setState('idle')
		})

		// death
		cell.map(tileIndex => {
			if (death.includes(+tileIndex)) this.setState('died')
		})

		if (this.state === 'idle') return


		this.position = pos
		Events.$emit('character-pos', this.position)
		// console.log(this.position)
		

		let newPos = cartToIso(
			grid.size.y * nextPos.y,
			grid.size.x * nextPos.x,
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
			.easing(Easing.Exponential.InOut)
			.start()

		// // temp
		// this.state = 'idle'
	}

	setState = state => this.state = state

	swapTexture(directionName) {

		Object.values(this.animations).map(item => item.animation.stop())

		this.animations[directionName].play()

		this.container.removeChildren()
		this.container.addChild(this.animations[directionName].animation)
	}

	draw(assets) {

		this.animations = {

			// direct move
			// temp
			'up': new Animator({ name: 'up' }),
			'down': new Animator({ name: 'down' }),
			'left': new Animator({ name: 'left' }),
			'right': new Animator({ name: 'right' }),


			// move with rotate
			'down_right': new Animator({ name: 'down_right' }),
			'left_down': new Animator({ name: 'left_down', loopStart: 81 }),
			'right_up': new Animator({ name: 'right_up', loopStart: 27 }),
			'up_left': new Animator({ name: 'up_left', loopStart: 54 }),
			'up_down': new Animator({ name: 'up_down' }),
			'left_right': new Animator({ name: 'left_right' }),


			// reverse
			'right_down': new Animator({ name: 'down_right', reverse: true }),
			'down_left': new Animator({ name: 'left_down', loopStart: 81, reverse: true }),
			'up_right': new Animator({ name: 'right_up', loopStart: 27, reverse: true }),
			'left_up': new Animator({ name: 'up_left', loopStart: 54, reverse: true }),
			'down_up': new Animator({ name: 'up_down', reverse: true }),
			'right_left': new Animator({ name: 'left_right', reverse: true }),


			// idle
			// frameCount: 1 is so temp
	
			'idle_up': new Animator({ name: 'idle_up', frameCount: 1 }),
			'idle_down': new Animator({ name: 'idle_down', frameCount: 1}),
			'idle_left': new Animator({ name: 'idle_left', frameCount: 1 }),		
			'idle_right': new Animator({ name: 'idle_right', frameCount: 1 }),
		}

		this.container.addChild(this.animations['idle_up'].animation)

		let pos = cartToIso(
			this.position.y * grid.size.y,
			this.position.x * grid.size.x,
		)

		this.container.position.set(
			pos.x,
			pos.y
		)
	}
}
