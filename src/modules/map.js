import * as PIXI from 'pixi.js'

import tiles from '@/data/tiles'
import map from '@/data/map'

export default class Map {
	constructor() {

		this.container = new PIXI.Container()
	}

	preload() {
		let assets = {}

		// ?
		let t = tiles

		// resolve path
		Object.keys(t).map(key => {
			assets[key] = require(`@/assets/tiles/${t[key]}`)
		})

		// loading resources
		PIXI.loader
			.add(Object.values(assets))
			.load(() => this.draw(assets))
	}

	draw(assets) {

		// drawing map (level 0)
		let gridSize = 64

		for (let i = map.length - 1; i >= 0; i--) {
			for (let j = 0; j < map[i].length; j++) {
				
				let sprite = new PIXI.Sprite(PIXI.loader.resources[assets[map[i][j]]].texture)

				sprite.scale.set(4, 4)
				sprite.position.x = j * gridSize
				sprite.position.y = i * gridSize

				this.container.addChild(sprite)
			}
		}
	}
}
