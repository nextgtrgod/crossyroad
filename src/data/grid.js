
import { pixelRatio } from '@/config/index'

const divider = pixelRatio >= 2
	? 2
	: 1

const grid = {
	size: {
		x: 156 / divider,
		y: 156 / divider,
	}
}

export default grid
