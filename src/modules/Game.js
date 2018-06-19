import * as PIXI from 'pixi.js'

export default class Game {
	constructor({ view }) {

		console.log(view)

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

	}
}
