<template>
<div id="app">
	<router-view/>
</div>
</template>


<script>
import Events from '@/events'

export default {
	name: 'App',
}
</script>


<style lang="less">
@import './styles/normalize.less';
@import './styles/variables.less';

body {
	background-color: #242424;
	overflow: hidden; // temp
}

#app {
	font-family: @font-proxima;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: @color-text;
}

</style>
