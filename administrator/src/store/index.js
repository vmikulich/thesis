import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import category from './category'
import position from './position'
import auth from './auth'
import order from './order'
import analytics from './analytics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    category,
    position,
    auth,
    order,
    analytics
  }
})