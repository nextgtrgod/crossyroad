import * as PIXI from 'pixi.js'
import * as TWEEN from 'es6-tween'

import Map from '@/modules/Map'
import Character from '@/modules/Character'


export default class Render {
	constructor({ view }) {

		// remove this (only for pixel art / low res sprites)
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
		//

		this.app = new PIXI.Application({
			view,
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: false,
			transparent: false,
			forceCanvas: false,
			roundPixels: false,
			powerPreference: 'high-performance',
		})
		this.app.renderer.backgroundColor = 0x242424
		this.app.renderer.autoResize = true

		this.app.ticker.add(this.update, this)

		this.container = new PIXI.Container()
		this.app.stage.addChild(this.container)

		this.init()
	}

	async init() {
		this.start()

		// map
		let map = new Map()
		await map.preload()

		this.container.addChild(map.container)


		// character
		let character = new Character()
		await character.preload()

		console.log(character.container.width, character.container.height)

		this.container.addChild(character.container)

		
		// center scene
		this.container.pivot.set(
			this.container.width / 2,
			this.container.height,
		)
		this.container.position.set(window.innerWidth / 2, window.innerHeight)

	}

	update(delta) {
		TWEEN.update()
	}

	start() {
		this.app.ticker.start()
	}

	stop() {
		this.app.ticker.stop()
	}
}
