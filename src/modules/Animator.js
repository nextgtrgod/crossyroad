import * as PIXI from 'pixi.js'
import { Tween, Easing } from 'es6-tween'

import pad from '@/utils/pad'

export default class Animator {
	constructor({
		name,
		speed = 500,
		frameCount = 27,
		loopStart = 0,
		reverse = false,
		repeat = 0,
	}) {

		this.name = name
		this.speed = speed
		this.reverse = reverse
		this.frameCount = frameCount
		this.loopStart = loopStart

		this.repeat = repeat

		this.frames = []

		this.init()
	}

	init() {
		for (let i = this.loopStart; i < (this.loopStart + this.frameCount); i++) {

			let textureName = this.name + '_' + pad(i, 4)

			let sprite = new PIXI.Sprite(PIXI.loader.resources[this.name].textures[`${textureName}.png`])

			this.frames.push( sprite.texture )
		}

		this.animation = new PIXI.extras.AnimatedSprite(this.frames, false)
		this.animation.anchor.set(0, 1)

		let lastFrame = this.reverse
			? 0
			: this.frameCount - 1

		this.tween = new Tween({ frame: 0 })
			.to({ frame: this.frameCount}, this.speed)
			.on('update', ({ frame }) => {
				this.animation.gotoAndStop(Math.floor(frame))
			})
			.on('complete', ({ frame }) => {

				this.animation.gotoAndStop(lastFrame)
			})
			.repeat(this.repeat)
			.reverse(this.reverse)

	}

	play() {
		this.tween.start()
	}

	stop() {
		this.tween.stop()
	}

	playing() {
		return this.animation.playing
	}
}