
export default class Touch {
	constructor({ up, down, left, right }) {

		this.up = up
		this.down = down
		this.left = left
		this.right = right

		this.touchstartX = 0
		this.touchstartY = 0
		this.touchendX = 0
		this.touchendY = 0
		
		let touchZone = document.getElementById('game')

		this.limit = Math.tan(45 * 1.5 / 180 * Math.PI)

		let pageWidth = window.innerWidth || document.body.clientWidth
		this.threshold = Math.max(1, Math.floor(0.01 * (pageWidth)))
		
		touchZone.addEventListener('touchstart', e => {
			this.touchstartX = e.changedTouches[0].screenX
			this.touchstartY = e.changedTouches[0].screenY
		}, false)

		touchZone.addEventListener('touchend', e => {
			this.touchendX = e.changedTouches[0].screenX
			this.touchendY = e.changedTouches[0].screenY
			
			this.handleTouch(e)

		}, false)
	}

	handleTouch(e) {
		let x = this.touchendX - this.touchstartX
		let y = this.touchendY - this.touchstartY

		let xy = Math.abs(x / y)
		let yx = Math.abs(y / x)

		if (Math.abs(x) > this.threshold || Math.abs(y) > this.threshold) {
			if (yx <= this.limit) {
				if (x < 0) {
					this.left()
				} else {
					this.right()
				}
			}
			if (xy <= this.limit) {
				if (y < 0) {
					this.up()
				} else {
					this.down()
				}
			}
		} else {
			console.log('tap')
		}
	}
}
