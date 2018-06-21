import * as PIXI from 'pixi.js'

import tiles from '@/data/tiles'
import map from '@/data/map'

import grid from '@/data/grid'

export default class Map {
	constructor() {

		this.container = new PIXI.Container()

	}

	async preload() {
		return new Promise((resolve, reject) => {
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
				.load(() => {
					resolve()
					this.draw(assets)
				})
		})
	}

	draw(assets) {

		// drawing map (level 0)
		for (let i = map.length - 1; i >= 0; i--) {
			for (let j = 0; j < map[i].length; j++) {
				
				let sprite = new PIXI.Sprite(PIXI.loader.resources[assets[map[i][j]]].texture)

				sprite.scale.set(
					grid.size / sprite.width,
					grid.size / sprite.height
				)

				sprite.position.x = j * grid.size
				sprite.position.y = i * grid.size

				this.container.addChild(sprite)
			}
		}
	}
}
