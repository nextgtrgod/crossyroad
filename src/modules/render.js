import Events from '@/events'

import * as PIXI from 'pixi.js'
import * as TWEEN from 'es6-tween'

import Map from '@/modules/Map'
import Character from '@/modules/Character'
import Bonus from '@/modules/Bonus'
// import Camera from '@/modules/Camera'

import { assets, pixelRatio } from '@/config/index'

export default class Render {
	constructor({ view }) {

		// keep this only for pixel art / low res sprites
		// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
		//

		this.app = new PIXI.Application({
			view,
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: true,
			transparent: false,
			forceCanvas: true,
			roundPixels: false,
			powerPreference: 'high-performance',
			autoResize: true,
			resolution: pixelRatio,
			backgroundColor: 0x242424,
		})


		this.container = new PIXI.Container()
		this.app.stage.addChild(this.container)


		this.init()


		Events.$on('character-death', ({ type }) => {
			console.log(type)

			this.stop()
		})
	}

	preload() {
		return new Promise(async (resolve) => {
			if (this.loaded) {
				return resolve()
			}

			PIXI.loader.pre((res, next) => {
				res.onComplete.add(function (r) {
					if (r.extension === 'json') {
						r.data.meta.image = require('../assets/2x/' + r.data.meta.image)
					}
				})
				next()
			})

			for (let key in assets.images) {
				PIXI.loader.add(key, assets.images[key])
			}

			// sounds
			// let format = 1 // ogg
			// if (!PIXI.sound.utils.supported.ogg) format = 0 // aac
			// if (PIXI.sound.utils.supported.mp3) format = 2 // mp3
			// for (let s of Object.keys(Assets.sounds)) {
			// 	try {
			// 		Sounds[s] = await this.preloadSound(Assets.sounds[s][format])
			// 	} catch (e) {
			// 		if (e) this.noSound = true
			// 	}
			// }

			PIXI.loader.load((loader, resources) => {

				this.loaded = true
				this.resources = resources

				resolve()
			})

		})
	}

	async init() {

		await this.preload()
		Events.$emit('app-loaded')

		console.log(PIXI.loader.resources)

		// map
		this.map = new Map()
		this.container.addChild(this.map.container)


		let coin = new Bonus({ type: 'coin' })
		coin.setPosition(5, 5)
		this.container.addChild(coin.container)

		let qiwi = new Bonus({ type: 'qiwi' })
		qiwi.setPosition(6, 2)
		this.container.addChild(qiwi.container)


		// character
		this.character = new Character()
		this.container.addChild(this.character.container)


		// camera
		// this.camera = new Camera({
		// 	world: this.container,
		// 	character: this.character,
		// })


		this.container.position.set(
			400,
			200
		)

		this.app.ticker.add(this.update, this)

		this.start()
		Events.$emit('app-loaded')
	}

	update(delta) {
		TWEEN.update()

		// this.camera.update()
	}

	start() {
		this.app.ticker.start()
	}

	stop() {
		this.app.ticker.stop()
	}
}
