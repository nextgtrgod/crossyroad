import * as PIXI from 'pixi.js'

import tiles from '@/data/tiles'
import map from '@/data/map'

import grid from '@/data/grid'
import { pixelRatio, assetsFolder } from '@/config/index'
import { cartToIso } from '@/utils/convert'

export default class Map {
	constructor() {

		this.container = new PIXI.Container()
		this.container.name = 'map'

		this.draw()
	}

	draw() {

		console.log(PIXI.loader.resources)
		console.log(tiles)

		// drawing map (level 0)
		for (let i = map.length - 1; i >= 0; i--) {
			// console.log(i + ' row')
			for (let j = 0; j < map[i].length; j++) {

				let sprite = new PIXI.Sprite(PIXI.loader.resources['tiles'].textures[ tiles[ map[i][j] ] ])
				sprite.name = `${i}-${j}`

				sprite.anchor.set(0, 1)

				let x = j * grid.size.x
				let y = i * grid.size.y

				let coords = cartToIso(i * grid.size.x, j * grid.size.y)

				// console.log(x, y, coords)

				sprite.position.x = coords.x
				sprite.position.y = coords.y

				this.container.addChild(sprite)
			}
		}
	}
}
