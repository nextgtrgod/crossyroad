
const pixelRatio = window.devicePixelRatio
const assetsFolder = pixelRatio >= 2
	? '@/assets/2x'
	: '@/assets/1x'

const assets = {
	images: {
		'down_right': require(`@/assets/2x/down_right.json`),
		'left_down': require(`@/assets/2x/left_down.json`),
		'right_up': require(`@/assets/2x/right_up.json`),
		'up_left': require(`@/assets/2x/up_left.json`),
		'tiles': require(`@/assets/2x/tiles@2x.json`),
	},
	sounds: {

	},
}

export {
	pixelRatio,
	assetsFolder,
	assets,
}
