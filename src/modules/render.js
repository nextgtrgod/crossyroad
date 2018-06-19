import * as PIXI from 'pixi.js'
import * as TWEEN from 'es6-tween'

import tiles from '@/data/tiles'

import Map from '@/modules/map'

export default class Render {
	constructor({ view }) {

		this.app = new PIXI.Application({
			view,
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: true,
			transparent: false,
			forceCanvas: true,
		})
		this.app.renderer.backgroundColor = 0x333333
		this.app.renderer.autoResize = true

		this.app.ticker.add(this.update, this)

		this.load()
	}

	load() {
		let assets = {}

		Object.keys(tiles).map(key => {
			assets[key] = require(`@/assets/tiles/${tiles[key]}`)
		})

		PIXI.loader
			.add(Object.values(assets))
			.load(() => this.createMap(assets))
	}

	createMap(assets) {

		this.map = new Map(assets)
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
