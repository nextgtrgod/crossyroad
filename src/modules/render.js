import * as PIXI from 'pixi.js'
import * as TWEEN from 'es6-tween'

import tiles from '@/data/tiles'

import Map from '@/modules/map'

export default class Render {
	constructor({ view }) {

		// remove this (only for pixel art / low res sprites)
		PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST
		//

		this.app = new PIXI.Application({
			view,
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: false,
			transparent: false,
			forceCanvas: false,
			roundPixels: false,
		})
		this.app.renderer.backgroundColor = 0x242424
		this.app.renderer.autoResize = true

		this.app.ticker.add(this.update, this)

		this.load()
	}

	load() {

		let map = new Map()

		let gridSize = 64

		map.container.pivot.set(
			gridSize * 4, gridSize * 5
		)
		map.container.position.set(window.innerWidth / 2, window.innerHeight / 2)

		console.log(map.container.position)

		this.app.stage.addChild(map.container)

		map.preload()
	}

	update(delta) {
		TWEEN.update()
	}

	start() {
		this.ticker.start()
	}

	stop() {
		this.ticker.stop()
	}
}
