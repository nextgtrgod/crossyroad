<template>
<canvas id="game"/>
</template>


<script>
import Events from '@/events'
import Game from '@/modules/Game'

export default {
	name: 'Scene',
	data() {
		return {

		}
	},
	mounted() {
		this.game = new Game({
			view: this.$el
		})
	},
}
</script>


<style lang="less">
@import '../styles/variables.less';


</style>
