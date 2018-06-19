import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Events from '@/events'

Vue.use(Vuex)

const state = {}

const store = new Vuex.Store({
	strict: false,
	state,
	getters,
	actions,
	mutations,
})

store.watch(
	state => state.selected,
	() => Events.$emit('state-update', { state }),
	{ deep: true }
)

export default store
