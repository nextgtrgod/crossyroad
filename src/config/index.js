
const pixelRatio = window.devicePixelRatio
const assetsFolder = pixelRatio >= 2
	? '@/assets/2x'
	: '@/assets/1x'

const assets = {
	images: {
		'tiles': require(`@/assets/2x/tiles@2x.json`),

		'up': require(`@/assets/2x/up@2x.json`),
		'down': require(`@/assets/2x/down@2x.json`),
		'left': require(`@/assets/2x/left@2x.json`),
		'right': require(`@/assets/2x/right@2x.json`),

		'down_right': require(`@/assets/2x/down_right@2x.json`),
		'left_down': require(`@/assets/2x/left_down@2x.json`),
		'right_up': require(`@/assets/2x/right_up@2x.json`),
		'up_left': require(`@/assets/2x/up_left@2x.json`),
		'up_down': require(`@/assets/2x/up_down@2x.json`),
		'left_right': require(`@/assets/2x/left_right@2x.json`),

		'idle_up': require(`@/assets/2x/idle_up@2x.json`),
		'idle_down': require(`@/assets/2x/idle_down@2x.json`),
		'idle_left': require(`@/assets/2x/idle_left@2x.json`),
		'idle_right': require(`@/assets/2x/idle_right@2x.json`),

		'coin': require(`@/assets/2x/coin@2x.json`),
		'qiwi': require(`@/assets/2x/qiwi@2x.json`),
	},
	sounds: {

	},
}

export {
	pixelRatio,
	assetsFolder,
	assets,
}
