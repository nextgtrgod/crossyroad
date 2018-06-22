import Events from '@/events'

export default class Key {
	constructor(code, press, release, options) {

		this.options = options || {
			infinitePress: false,
			// ...
		}

		this.keyName = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
			32: 'space',
			27: 'esc',
		}

		this.code = typeof code === 'string'
			? +Object.keys(this.keyName).find(key => this.keyName[key] === code)
			: code

		this.isDown = false
		this.isUp = true
		this.press = press
		this.release = release

		window.addEventListener('keydown', this.downHandler)
		window.addEventListener('keyup', this.upHandler)
	}

	downHandler = event => {

		if (this.isDown && !this.options.infinitePress) return

		if (event.keyCode === this.code) {

			this.isUp && this.press && this.press()

			this.isDown = true
			this.isUp = false

			Events.$emit(`${this.keyName[this.code]}-press`)
		}

		// event.preventDefault()
	}

	upHandler = event => {
		if (event.keyCode === this.code) {
			
			this.isDown && this.release && this.release()
			
			this.isDown = false
			this.isUp = true

			Events.$emit(`${this.keyName[this.code]}-release`)
		}

		// event.preventDefault()
	}

}