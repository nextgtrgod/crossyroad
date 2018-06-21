import * as PIXI from 'pixi.js'
import Key from '@/modules/key'

export default class Character {
	constructor() {

		this.container = new PIXI.Container()

		this.controls = {}

		;['up', 'right', 'down', 'left'].map(direction => {
			this.controls[direction] = new Key(
				direction,
				() => this.move(direction),
				() => this.stop(),
			)
		})
		
		console.log(this.controls)

		this.direction = 'up'
		this.state = 'idle' // 'idle', 'moving', 'death' (+ death options)
	}

	move(direction) {

		this.state = 'moving'

		switch (direction) {
			case 'up':
				this.container.position.y -= 64
				break;

			case 'right':
				this.container.position.x += 64
				break;

			case 'down':
				this.container.position.y += 64
				break;
			
			case 'left':
				this.container.position.x -= 64
				break;
		
			default:
				break;
		}

		// this.position.set()
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

		console.log(sprite.width)

		this.container.addChild(sprite)

		this.container.pivot.set(
			this.container.width / 2,
			this.container.heigth / 2,
		)

		this.container.scale.set(
			4, 4
		)

	}
}