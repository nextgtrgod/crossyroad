<template>
<div id="app">
	<router-view/>

	<div id="modal" :class="{ visible: state === 'died' }">
		<h1>You died</h1>
	</div>

</div>
</template>


<script>
import Events from '@/events'

export default {
	name: 'App',
	data() {
		return {
			state: 'idle'
		}
	},
	mounted() {

		Events.$on('character-death', () => this.state = 'died')

	},
}
</script>


<style lang="less">
@import './styles/normalize.less';
@import './styles/variables.less';

body {
	position: relative;
	background-color: #242424;
	overflow: hidden; // temp
}

#app {
	font-family: @font-proxima;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: @color-text;
}

#modal {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	pointer-events: none;
	background-color: fade(#000, 75%);
	transition: opacity 1s;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}

	h1 {
		font-size: 120px;
		color: #b90201;
		pointer-events: none;
		user-select: none;
	}
}

</style>
