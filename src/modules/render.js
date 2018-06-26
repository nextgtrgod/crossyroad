import Events from '@/events'

import * as PIXI from 'pixi.js'
import * as TWEEN from 'es6-tween'

import Map from '@/modules/Map'
import Character from '@/modules/Character'
import Camera from '@/modules/Camera'


export default class Render {
	constructor({ view }) {

		// keep this only for pixel art / low res sprites
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


		this.container = new PIXI.Container()
		this.app.stage.addChild(this.container)


		this.init()


		Events.$on('character-death', ({ type }) => {
			console.log(type)

			this.stop()
		})
	}

	async init() {

		// map
		this.map = new Map()
		await this.map.preload()

		this.container.addChild(this.map.container)


		// character
		this.character = new Character()
		await this.character.preload()

		this.container.addChild(this.character.container)


		// camera
		this.camera = new Camera({
			world: this.container,
			character: this.character,
		})


		this.app.ticker.add(this.update, this)

		this.start()
		Events.$emit('app-loaded')
	}

	update(delta) {
		TWEEN.update()

		this.camera.update()
	}

	start() {
		this.app.ticker.start()
	}

	stop() {
		this.app.ticker.stop()
	}
}
