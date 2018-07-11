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

		// drawing map (level 0)
		for (let row = 0; row < map.length; row++) {

			for (let col = 0; col < map[row].length; col++) {

				let cell = map[row][col].split(':')

				cell.map(tileIndex => {

					if (!tileIndex) return

					let sprite = new PIXI.Sprite(PIXI.loader.resources['tiles'].textures[ tiles[tileIndex] ])

					sprite.anchor.set(0, 1)

					let coords = cartToIso(row * grid.size.y, col * grid.size.x)

					sprite.position.set(
						coords.x,
						coords.y
					)

					this.container.addChild(sprite)
				})
			}
		}
	}
}
