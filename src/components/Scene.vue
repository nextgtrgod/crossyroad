<template>
<canvas id="game" :class="{ loaded }"/>
</template>


<script>
import Events from '@/events'
import Render from '@/modules/Render'

export default {
	name: 'Scene',
	data() {
		return {
			loaded: false,
		}
	},
	created() {
		Events.$on('app-loaded', () => this.loaded = true)
	},
	mounted() {
		new Render({
			view: this.$el
		})
	},
}
</script>


<style lang="less">
@import '../styles/variables.less';


#game {
	opacity: 0;
	transition: opacity .4s;
	
	&.loaded {
		opacity: 1;
	}
}


</style>
