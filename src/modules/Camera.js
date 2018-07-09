import Events from '@/events'
import { Tween } from 'es6-tween'

import map from '@/data/map'
import grid from '@/data/grid'

export default class Camera {
	constructor({ world, character }) {

		this.world = world
		this.character = character

		this.velocity = 0
		this.defaultVelocity = 0
		this.panVelocity = 1.5

		this.viewportCenter = {
			x: window.innerWidth,
			y: window.innerHeight / 2,
		}

		this.current = {
			x: map[0].length,
			y: map.length,
		}

		this.world.pivot.set(
			this.world.width / 2,
			this.world.height - 64, // -64: temp
		)
		this.world.position.set(window.innerWidth / 2, window.innerHeight)

		Events.$on('character-pos', ({ x, y }) => {

			if (y < map.length - 2) this.defaultVelocity = .5

			// if (y >= this.current.y) return

			// this.world.pivot.set(
			// 	this.world.width / 2,
			// 	y * grid.size.y,
			// )

			// this.world.position.set(
			// 	window.innerWidth / 2,
			// 	window.innerHeight / 2,
			// )

			// new Tween({
			// 		pivotX: this.world.pivot.x,
			// 		pivotY: this.world.pivot.y,
			// 		posX: this.world.x,
			// 		posY: this.world.y,
			// 	})
			// 	.to({
			// 		pivotX: this.world.width / 2,
			// 		pivotY: y * grid.size.y,
			// 		posX: window.innerWidth / 2,
			// 		posY: window.innerHeight / 2,
			// 	}, 100)
			// 	.on('update', ({ pivotX, pivotY, posX, posY }) => {
			// 		this.world.pivot.set(
			// 			pivotX,
			// 			pivotY,
			// 		)

			// 		this.world.position.set(
			// 			posX,
			// 			posY,
			// 		)
			// 	})
			// 	.start()


			// new Tween({ velocity: this.velocity})
			// 	.to({ velocity: this.velocity + 2 })
			// 	.on('update', ({ velocity }) => this.velocity = velocity)
			// 	.start()

		})


		// temp
		document.addEventListener('keyup', ({ keyCode }) => {
			switch (keyCode) {
				case 49:
					this.savedVelocity = this.velocity
					this.velocity = 0
					break;
				
				case 50:
					this.velocity = this.savedVelocity || .5
					break;
			}
		})

	}

	pan() {
		let charPos = map.length * grid.size.y - this.character.container.y
		let cameraPos = this.world.position.y - window.innerHeight / 2

		if (this.world.position.y - window.innerHeight > charPos) {
			Events.$emit('character-death', { type: 'screen' })
		}

		if (charPos > cameraPos) {
			this.velocity = (charPos - cameraPos) / 60
			if (this.velocity < this.defaultVelocity) this.velocity = this.defaultVelocity
		} else {
			this.velocity = this.defaultVelocity
		}
	}

	update() {
		this.pan()
		this.world.y += this.velocity
	}
}
