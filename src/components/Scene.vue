<template>
<canvas id="game"/>
</template>


<script>
import Events from '@/events'
import Render from '@/modules/Render'

export default {
	name: 'Scene',
	data() {
		return {

		}
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


</style>
