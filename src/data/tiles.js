import { pixelRatio } from '@/config/index'

// const postfix = pixelRatio >= 2
// 	? '@2x'
// 	: '@1x'

const postfix = ''

const tiles = {
	1: `road_01${postfix}.png`,

	// 1: `road_02_1${postfix}.png`,
	// 2: `road_02_2${postfix}.png`,
	// 3: `road_02_3${postfix}.png`,
	// 4: `road_02_4${postfix}.png`,

	5: `grass_01${postfix}.png`,
	6: `railway_01${postfix}.png`,

	7: `water_01${postfix}.png`,
	8: `water_02${postfix}.png`,

	11: `tree_01${postfix}.png`,
	12: `tree_02${postfix}.png`,
	13: `tree_03${postfix}.png`,
	14: `tree_04${postfix}.png`,

	21: `wall_01${postfix}.png`,
	22: `wall_02${postfix}.png`,
	23: `wall_03${postfix}.png`,

	// 9: `grid_01${postfix}.png`,
}

export default tiles
