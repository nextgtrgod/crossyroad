import * as PIXI from 'pixi.js'
import Animator from '@/modules/Animator'
import Events from '@/events'
import grid from '@/data/grid'

import { cartToIso } from '@/utils/convert'

export default class Bonus {
	constructor({ type = 'coin' }) {

		this.type = type
		this.container = new PIXI.Container()
		this.container.name = this.type

		this.position = [0, 0]

		this.draw()
	}

	draw() {

		this.animation = this.type === 'coin'
			? new Animator({ name: 'coin', frameCount: 45, speed: 1500, repeat: Infinity })
			: new Animator({ name: 'qiwi', frameCount: 40, speed: 1000, repeat: Infinity })

		this.animation.play()

		this.container.addChild(this.animation.animation)
	}

	setPosition(x, y) {
		this.position = [x, y]

		let coords = cartToIso(y * grid.size.y, x * grid.size.y)

		this.container.position.set(
			coords.x,
			coords.y,
		)
	}
}
