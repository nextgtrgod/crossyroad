import * as PIXI from 'pixi.js'

export default class Animator {
	constructor({ name, speed = 1, frameCount = 26, parent, loopStart = 0, json }) {

		this.name = name
		this.speed = speed
		this.frameCount = frameCount
		this.parent = parent
		this.loopStart = 0

		this.json

		this.frames = []

		this.init()
	}

	init() {

		console.log(PIXI.utils.TextureCache)

		for (let i = this.loopStart; i < (this.loopStart + this.frameCount); i++) {

			let val = i < 10
				? '0' + i
				: i

			console.log(this.json)

			this.frames.push(new PIXI.Sprite(PIXI.loader.resources[this.json].textures[`${this.name}${val}.png`]))
		}

		this.animation = new PIXI.extras.AnimatedSprite(this.frames)
		this.animation.anchor.set(0, 1)
		this.animation.speed = this.speed
	}

	play() {
		this.animation.play()
	}

	stop() {
		this.animation.stop()
	}

	playing() {
		return this.animation.playing
	}
}