
let cartToIso = (x, y) => {
	return {
		x: -x * Math.sin(20 * Math.PI / 180) + y * Math.cos(20 * Math.PI / 180), 
		y: (x * Math.cos(20 * Math.PI / 180) + y * Math.sin(20 * Math.PI / 180)) * Math.sin(30 * Math.PI / 180),
	}
}

export {
	cartToIso,
}
