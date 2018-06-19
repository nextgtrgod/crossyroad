import Vue from 'vue'
import Router from 'vue-router'

import Scene from '@/components/Scene'

Vue.use(Router)

const router = new Router({
	routes: [
    	{
			path: '/',
			name: 'Scene',
			component: Scene,
    	}
  	],
	mode: 'history'
})

export default router
